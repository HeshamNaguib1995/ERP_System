import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  imports: [],
  templateUrl: './test.html',
  styleUrl: './test.css',
})
export class Test {
stats = [
    {
      title: 'Employee Attendance',
      value: 0.92,
      change: 2.3,
      color: '#28a745',
      icon: 'fas fa-user-check'
    },
    {
      title: 'Payroll Accuracy',
      value: 0.85,
      change: -1.2,
      color: '#007bff',
      icon: 'fas fa-file-invoice-dollar'
    },
    {
      title: 'Project Completion',
      value: 0.78,
      change: 3.1,
      color: '#ffc107',
      icon: 'fas fa-tasks'
    },
    {
      title: 'Employee Satisfaction',
      value: 0.88,
      change: 0.9,
      color: '#17a2b8',
      icon: 'fas fa-smile-beam'
    }
  ];
}
