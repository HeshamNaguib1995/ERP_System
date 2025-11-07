import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.css'],
})
export class SignUp {
  signupForm: FormGroup;
  submitting = false;
  serverError: string = '';

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        mobile: ['', [Validators.required, Validators.pattern(/^\+?\d{7,15}$/)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validators: this.passwordsMatch }
    );
  }

  passwordsMatch(group: FormGroup) {
    const pwd = group.get('password')?.value;
    const cpwd = group.get('confirmPassword')?.value;
    return pwd === cpwd ? null : { passwordMismatch: true };
  }

  get f() {
    return this.signupForm.controls;
  }

  getFieldError(field: string): string {
    const control = this.f[field];
    if (control.touched || control.dirty) {
      if (control.errors?.['required']) return 'This field is required.';
      if (control.errors?.['minlength'])
        return `Minimum ${control.errors['minlength'].requiredLength} characters required.`;
      if (control.errors?.['email']) return 'Invalid email address.';
      if (control.errors?.['pattern']) return 'Invalid mobile number.';
    }
    if (field === 'confirmPassword' && this.signupForm.errors?.['passwordMismatch']) {
      return 'Passwords do not match.';
    }
    return '';
  }

  async onSubmit() {
    this.serverError = '';
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    this.submitting = true;
    const payload = {
      fullName: this.f['fullName'].value,
      email: this.f['email'].value,
      mobile: this.f['mobile'].value,
      password: this.f['password'].value,
    };
    try {
      // Replace with your API endpoint
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const errText = await res.text().catch(() => 'Sign up failed');
        this.serverError = errText;
        this.submitting = false;
        return;
      }
      alert('Sign up successful.');
      this.signupForm.reset();
    } catch (err) {
      this.serverError = 'Network error. Please try again.';
    }
    this.submitting = false;
  }
}
