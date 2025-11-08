import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProducts() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = environment.apiUrl + 'Product/';
   constructor(private http: HttpClient) {}
   getAll(): Observable<Product[]> {
       return this.http.get<Product[]>(this.apiUrl + 'GetEmployees');
       }
       
}
