import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'recognize' },
  { path: 'enroll', loadComponent: () => import('./pages/enroll/enroll.component').then(m => m.EnrollComponent) },
  { path: 'recognize', loadComponent: () => import('./pages/recognize/recognize.component').then(m => m.RecognizeComponent) },
  { path: 'employees', loadComponent: () => import('./pages/employees/employees.component').then(m => m.EmployeesComponent) },
  { path: '**', redirectTo: 'recognize' }
];
