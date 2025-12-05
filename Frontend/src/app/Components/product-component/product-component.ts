import { ProductService } from './../../Services/product-service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../Models/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductUpdate } from '../../Models/product-update';
import { ProductAdd } from '../../Models/product-add';
import { Brand } from '../../Models/brand';
import { ProductCategory } from '../../Models/product-category';

@Component({
  selector: 'app-product-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-component.html',
  styleUrl: './product-component.css',
})
export class ProductComponent implements OnInit {
  Products: Product[] = [];
  AllProducts: Product[] = [];
  EditProduct: ProductUpdate = {} as ProductUpdate;
  Product: ProductAdd = {} as ProductAdd;
  Brands: Brand[] = [];
  Categories: ProductCategory[] = []
  openForm = false;
  Editing = false;
  searchText : string = '';   
  constructor(private ProductService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
    this.GetFormData(); 
    // const jsonString =
    //   '{"id": 6, "name": "HUAWEI Band 10 Smartwatch", "productCategoryName": "Stop Watch", "price": 2500, "discount": 10, "brandName": "Hauwei"}';
    // this.Product1 = JSON.parse(jsonString);
    // console.log(this.Product1);
    
  }
  searchData()
  {
    this.Products = this.AllProducts.filter(
           p => p.name.toLowerCase().includes(this.searchText.toLowerCase())||
           p.productCategoryName.toLowerCase().includes(this.searchText.toLowerCase())||
           p.brandName.toLowerCase().includes(this.searchText.toLowerCase())
          );
  }
  GetFormData() {
   this.ProductService.GetProductBrands().subscribe((data) => {
      this.Brands = data;
      console.log('Brands loaded:', this.Brands);
    });
    this.ProductService.GetProductCategogries().subscribe((data) => {
      this.Categories = data;
    });
  }
  loadProducts() {
    this.ProductService.getProducts().subscribe((data: Product[]) => {
      this.Products = data;
      this.AllProducts = data;
    });
  }
  GetProductById(id : number)
    { 
      this.ProductService.GetProductById(id).subscribe(data => {
        console.log('Fetching interface', this.EditProduct);

        this.EditProduct = data;
        console.log('Product loaded:', this.EditProduct);
        this.Editing = true;
      });
  }
  DeleteProduct(id : number)
  { 
    this.ProductService.DeleteProduct(id).subscribe(() => {
      console.log('Product deleted with id:', id);
      this.loadProducts(); // Refresh the product list after deletion
    });
  }
  openAdd()
  {
        this.Product = {} as ProductAdd;
        this.openForm = true;
  }
  resetForm() {
        this.Product = {} as ProductAdd;
        this.Editing = false;
        this.openForm = false;
  }
  onEditSubmit() 
  {  
    console.log('Product updated:', this.EditProduct);
    this.ProductService.updateProduct(this.EditProduct).subscribe(() => {
      
      this.loadProducts();  
      this.resetForm();
    });
  }
  onAddSubmit()
  {
    this.ProductService.addProduct(this.Product).subscribe(() => {
      console.log('Product added:', this.Product);
      this.loadProducts();  
      this.resetForm();
    });
  }

}
