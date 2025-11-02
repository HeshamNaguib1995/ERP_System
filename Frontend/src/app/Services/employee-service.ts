import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../Models/employee';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = environment.apiUrl + 'Employee/';
   constructor(private http: HttpClient) {}
    getAll(): Observable<Employee[]> {
    return this.http.get<any[]>(this.apiUrl + 'GetEmployees');
  }
  
}
