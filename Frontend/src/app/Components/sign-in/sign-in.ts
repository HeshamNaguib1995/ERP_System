import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../Services/auth-service';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './sign-in.html',
  styleUrls: ['./sign-in.css'],
})
export class SignInComponent implements OnInit {
  username: string = '';
  password: string = '';
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    // initialization (no-op)
  }
  onButtonClick() {
    console.log('Sign-in submitted:', this.username, this.password);
    this.authService.getDepartmentAPI(this.username , this.password);  
    // handle sign-in submission (placeholder)
  }
}
