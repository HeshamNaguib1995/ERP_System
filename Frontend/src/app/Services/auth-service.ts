import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DepartmentResponse } from '../Models/department-response';
import { JwtHelperService } from '@auth0/angular-jwt';
import { error } from 'console';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + 'Login/';
  private roleKey = 'UserDepartment';
  private jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient, private router: Router) {}

  getDepartmentAPI(Email : string , Password:string ){
    const body = {
        Email: Email,
        Password: Password
    }
    this.AuthLogin(Email,Password);
    const token = this.getToken();
    if (token) {  
      const decoded = this.jwtHelper.decodeToken(token);
      console.log('Decoded JWT:', decoded.name);
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
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  AuthLogin(Email : string , Password:string) {
       const body = {
        Email: Email,
        Password: Password
    }  
     
    this.http.post<{token: string}>(this.apiUrl+'AuthLogin',body).pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
        })
      ).subscribe({
        next: () => {
          console.log('AuthService: JWT token stored successfully');
        },
        error: (err) => {
          console.error('AuthService: Error storing JWT token', err);
        }
      });
      
  }

}
