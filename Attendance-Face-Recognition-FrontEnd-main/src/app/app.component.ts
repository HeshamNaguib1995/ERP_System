import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from './services/api.service';
import { ThemeService } from './services/theme.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'attendance-frontend';
  apiStatus: 'online' | 'offline' | 'checking' = 'checking';
  isDarkMode$!: Observable<boolean>;

  private healthCheckSubscription?: Subscription;

  constructor(
    private api: ApiService,
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isDarkMode$ = this.themeService.darkMode$;
  }

  ngOnInit() {
    // Only run health check in browser, not during SSR
    if (isPlatformBrowser(this.platformId)) {
      this.checkHealth();
      // Check health every 30 seconds
      this.healthCheckSubscription = interval(30000).subscribe(() => {
        this.checkHealth();
      });
    } else {
      // During SSR, set a default status
      this.apiStatus = 'offline';
    }
  }

  ngOnDestroy() {
    this.healthCheckSubscription?.unsubscribe();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  checkHealth() {
    // Double check we're in browser before making API call
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    this.apiStatus = 'checking';
    this.api.health().subscribe({
      next: (data) => {
        this.apiStatus = data.status === 'ok' ? 'online' : 'offline';
      },
      error: () => {
        this.apiStatus = 'offline';
      }
    });
  }
}
