import { ProductService } from './../../Services/product-service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../Models/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-component.html',
  styleUrl: './product-component.css',
})
export class ProductComponent implements OnInit {
  Products: Product[] = [];
  Product1: Product = {} as Product;

  constructor(private ProductService: ProductService) {}

  ngOnInit() {
    this.loadProducts();

    // const jsonString =
    //   '{"id": 6, "name": "HUAWEI Band 10 Smartwatch", "productCategoryName": "Stop Watch", "price": 2500, "discount": 10, "brandName": "Hauwei"}';
    // this.Product1 = JSON.parse(jsonString);
    // console.log(this.Product1);
    
  }
  loadProducts() {
    this.ProductService.getAll().subscribe((data: Product[]) => {
      this.Products = data;
    });
  }
}
