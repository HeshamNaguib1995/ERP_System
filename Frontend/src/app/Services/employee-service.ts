import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../Models/employee';
import { environment } from '../../environments/environment.development';
import { City } from '../Models/city';
import { Position } from '../Models/position';
import { Bank } from '../Models/bank';
import { EmployeeAdd } from '../Models/employee-add';
import { EmployeeUpdate } from '../Models/employee-update';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = environment.apiUrl + 'Employee/';
   constructor(private http: HttpClient) {}
    getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl + 'GetEmployees');
  }
  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl + 'GetCities');
  }
  getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(this.apiUrl + 'GetPositions');
  }
  getBanks(): Observable<Bank[]> {
    return this.http.get<Bank[]>(this.apiUrl + 'GetBanks');
  }
  create(employee: EmployeeAdd): Observable<EmployeeAdd> {
    return this.http.post<EmployeeAdd>(this.apiUrl + 'AddEmployee', employee);
  }
  GetEmpById(id: number): Observable<EmployeeUpdate> {
    return this.http.get<EmployeeUpdate>(this.apiUrl + 'GetEmployeeById?id=' + id);
  }
  update(employee: EmployeeUpdate): Observable<boolean> {
    return this.http.put<boolean>(this.apiUrl + 'UpdateEmployee' , employee);
  }
  Delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.apiUrl + 'DeleteEmployee?id=' + id);
  }
}
