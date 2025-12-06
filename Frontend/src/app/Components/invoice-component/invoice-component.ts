import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../Services/product-service';
import { Product } from '../../Models/product';
import { CardComponent } from "../card-component/card-component";
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-invoice-component',
  imports: [CommonModule, CardComponent,FormsModule],
  templateUrl: './invoice-component.html',
  styleUrl: './invoice-component.css',
})
export class InvoiceComponent implements OnInit {
   products: Product[] = [];
   PagedProducts: Product[] = [];
   filteredProducts: Product[] = [];
  searchText: string = '';
  currentPage = 1;
  pageSize = 16;  // how many products per page
  totalPages = 1;
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
  applySearch() {
    const txt = this.searchText.toLowerCase();

    this.filteredProducts = this.products.filter(p =>
      p.brandName.toLowerCase().includes(txt)||
      p.name.toLowerCase().includes(txt) ||
      p.productCategoryName.toLowerCase().includes(txt)
    );

    this.totalPages = Math.ceil(this.filteredProducts.length / this.pageSize);
    this.currentPage = 1;
    this.updatePagedProducts();
  }
  updatePagedProducts() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.PagedProducts = this.products.slice(start, end);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagedProducts();
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  prevPage() {
    this.goToPage(this.currentPage - 1);
  }
}
