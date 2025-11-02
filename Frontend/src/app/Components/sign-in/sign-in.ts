import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule],
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
