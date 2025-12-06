import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-dashboard',
  imports: [CommonModule],
  templateUrl: './sales-dashboard.html',
  styleUrls: ['./sales-dashboard.css'],
})
export class SalesDashboard {
  selectedSection: string = '';

  selectSection(section: string): void {
    this.selectedSection = section;
  }
}
