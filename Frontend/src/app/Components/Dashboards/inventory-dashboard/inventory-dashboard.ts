import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from "../../product-component/product-component";

@Component({
  selector: 'app-inventory-dashboard',
  imports: [CommonModule, ProductComponent],
  templateUrl: './inventory-dashboard.html',
  styleUrls: ['./inventory-dashboard.css']
})
export class InventoryDashboard implements OnInit {
  selectedSection: string = 'product-management';

  ngOnInit(): void {
    // Initialization logic (if needed)
  }

  selectSection(section: string): void {
    this.selectedSection = section;
  }
}
