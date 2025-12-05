import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../Models/product';
import { ProductUpdate } from '../Models/product-update';
import { Brand } from '../Models/brand';
import { ProductCategory } from '../Models/product-category';
import { ProductAdd } from '../Models/product-add';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl + 'Product';
  constructor(private http: HttpClient) { }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + '/GetProducts');
  }
  DeleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/DeleteProduct/${id}`);
  }
  GetProductById(id: number): Observable<ProductUpdate> {
    return this.http.get<ProductUpdate>(`${this.apiUrl}/GetProductById/${id}`);
  }
  GetProductBrands() : Observable<Brand[]> 
  {
    return this.http.get<Brand[]>(this.apiUrl + '/GetProductBrands');
  }
  GetProductCategogries() : Observable<ProductCategory[]> 
  {
    return this.http.get<any[]>(this.apiUrl + '/GetProductCategories');
  }
  updateProduct(product: ProductUpdate): Observable<boolean> {
    console.log('Updating product:', product);
    return this.http.put<boolean>(`${this.apiUrl}/UpdateProduct`, product);
  }
  addProduct(product: ProductAdd): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/AddProduct`, product);
  }

}
