import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from '../../invoice-component/invoice-component';

@Component({
  selector: 'app-sales-dashboard',
  imports: [CommonModule, InvoiceComponent],
  templateUrl: './sales-dashboard.html',
  styleUrls: ['./sales-dashboard.css'],
})
export class SalesDashboard {
  selectedSection: string = '';

  selectSection(section: string): void {
    this.selectedSection = section;
  }
}
