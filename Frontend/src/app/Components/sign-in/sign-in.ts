import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './sign-in.html',
  styleUrls: ['./sign-in.css'],
})
export class SignInComponent implements OnInit {
  ngOnInit(): void {
    // initialization (no-op)
  }
  onSubmit() {
    // handle sign-in submission (placeholder)
  }
}
