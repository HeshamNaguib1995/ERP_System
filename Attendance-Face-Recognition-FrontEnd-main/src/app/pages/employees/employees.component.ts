import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  loading = true;
  errorMsg = '';
  employees: Array<{ employee_id: string; employee_name: string }> = [];

  constructor(
    private api: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // Only load employees in browser, not during SSR
    if (isPlatformBrowser(this.platformId)) {
      this.load();
    } else {
      this.loading = false;
      this.employees = [];
    }
  }

  load() {
    this.loading = true;
    this.errorMsg = '';
    this.api.employees().subscribe({
      next: (list) => {
        this.employees = list;
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = err?.message || 'Failed to load employees';
        this.loading = false;
      }
    });
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
