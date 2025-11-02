import { Component, OnInit } from '@angular/core';
import { SignInComponent } from "../sign-in/sign-in";

@Component({
  selector: 'app-login',
  imports: [SignInComponent],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent implements OnInit {
 ngOnInit(): void {

 }
}
