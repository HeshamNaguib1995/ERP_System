import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../Models/employee';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'https://localhost:7066/api/Employee/';
   constructor(private http: HttpClient) {}
    getAll(): Observable<Employee[]> {
    return this.http.get<any[]>(this.apiUrl + 'GetEmployees');
  }
  
}
