import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebcamCaptureComponent } from '../../shared/webcam-capture/webcam-capture.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-enroll',
  standalone: true,
  imports: [CommonModule, FormsModule, WebcamCaptureComponent],
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.scss']
})
export class EnrollComponent {
  employee_id = '';
  employee_name = '';
  inputMode: 'webcam' | 'upload' = 'webcam';
  captured: Blob[] = [];
  capturedImageUrls: string[] = [];
  uploadedImages: (File | null)[] = [null, null, null, null, null];
  uploadedImageUrls: (string | undefined)[] = [];
  submitting = false;
  message = '';

  constructor(private api: ApiService) { }

  switchInputMode(mode: 'webcam' | 'upload') {
    this.inputMode = mode;
    if (mode === 'webcam') {
      this.clearImages();
    } else {
      this.uploadedImages = [null, null, null, null, null];
      this.uploadedImageUrls = [];
    }
  }

  onCaptured(img: Blob) {
    if (this.captured.length < 5) {
      this.captured = [...this.captured, img];
      // Convert blob to data URL for preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.capturedImageUrls = [...this.capturedImageUrls, e.target?.result as string];
      };
      reader.readAsDataURL(img);
    }
  }

  clearImages() {
    this.captured = [];
    this.capturedImageUrls = [];
  }

  triggerFileInput(index: number) {
    if (typeof document !== 'undefined') {
      const input = document.getElementById(`uploadInput${index}`) as HTMLInputElement;
      input?.click();
    }
  }

  onFileSelected(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.uploadedImages[index] = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedImageUrls[index] = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  getProgressText(): string {
    if (this.captured.length === 0) {
      return 'Click "Capture" to begin capturing 5 photos';
    } else if (this.captured.length < 5) {
      return `Great! Now capture photo ${this.captured.length + 1} of 5`;
    } else {
      return '✅ All 5 photos captured! You can now enroll the employee.';
    }
  }

  canSubmit() {
    if (this.inputMode === 'webcam') {
      return this.employee_id && this.employee_name && this.captured.length === 5 && !this.submitting;
    } else {
      return this.employee_id && this.employee_name && 
             this.uploadedImages.every(img => img !== null) && 
             !this.submitting;
    }
  }

  submit() {
    if (!this.canSubmit()) return;
    this.submitting = true;
    this.message = '';
    
    const images = this.inputMode === 'webcam' 
      ? this.captured 
      : this.uploadedImages.map(img => img as File);
    
    this.api.enroll({ employee_id: this.employee_id, employee_name: this.employee_name, images })
      .subscribe({
        next: (res) => {
          this.message = `Enrolled successfully with ${res.stored_samples} samples.`;
          this.submitting = false;
          // Reset form
          this.employee_id = '';
          this.employee_name = '';
          this.clearImages();
          this.uploadedImages = [null, null, null, null, null];
          this.uploadedImageUrls = [];
        },
        error: (err) => {
          this.message = err?.error?.detail || 'Enrollment failed';
          this.submitting = false;
        }
      });
  }
}
