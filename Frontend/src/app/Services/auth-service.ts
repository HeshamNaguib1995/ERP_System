import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DepartmentResponse } from '../Models/department-response';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + 'Login/';
  private roleKey = 'UserDepartment';
  constructor(private http: HttpClient, private router: Router) {}

  getDepartmentAPI(Email : string , Password:string ){
    const body = {
        Email: Email,
        Password: Password
    }
      this.http
          .post<DepartmentResponse>(this.apiUrl+'Authenticate',body)
          .subscribe({
        next: (response) => {
          //console.log('AuthService: login successful, department:', response.name);
           window.localStorage.setItem(this.roleKey , response.name);
           //console.log('Result', window.localStorage.getItem(this.roleKey));
          // ✅ Redirect to dashboard after login
          this.router.navigate(['/Home']);
        },
        error: (err) => {
          alert('Invalid credentials');
          console.error(err);
        }
      });
    }
    getDepartment(): string | null {
    return localStorage.getItem(this.roleKey);
  }    
}
