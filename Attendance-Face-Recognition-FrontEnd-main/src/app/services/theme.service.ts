import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';
  private darkModeSubject = new BehaviorSubject<boolean>(this.getInitialTheme());
  public darkMode$: Observable<boolean> = this.darkModeSubject.asObservable();

  constructor() {
    // Only apply theme in browser
    if (typeof document !== 'undefined') {
      this.applyTheme(this.darkModeSubject.value);
    }
  }

  private getInitialTheme(): boolean {
    if (typeof window === 'undefined') {
      return false; // Default to light mode during SSR
    }
    
    const saved = localStorage.getItem(this.THEME_KEY);
    if (saved !== null) {
      return saved === 'dark';
    }
    
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  toggleTheme(): void {
    const newTheme = !this.darkModeSubject.value;
    this.setTheme(newTheme);
  }

  setTheme(isDark: boolean): void {
    this.darkModeSubject.next(isDark);
    this.applyTheme(isDark);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.THEME_KEY, isDark ? 'dark' : 'light');
    }
  }

  isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }

  private applyTheme(isDark: boolean): void {
    if (typeof document === 'undefined') {
      return; // Skip during SSR
    }
    
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark-mode');
      html.classList.remove('light-mode');
    } else {
      html.classList.add('light-mode');
      html.classList.remove('dark-mode');
    }
  }
}

