import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebcamCaptureComponent } from '../../shared/webcam-capture/webcam-capture.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-recognize',
  standalone: true,
  imports: [CommonModule, FormsModule, WebcamCaptureComponent],
  templateUrl: './recognize.component.html',
  styleUrls: ['./recognize.component.scss']
})
export class RecognizeComponent {
  mode: 'checkin' | 'checkout' = 'checkin';
  inputMode: 'webcam' | 'upload' = 'webcam';
  lastBlob?: Blob;
  uploadedImage?: File;
  uploadedImageUrl?: string;
  loading = false;
  result?: {
    employee_id?: string;
    employee_name?: string;
    similarity?: number;
    recognized: boolean;
    mode: string;
  };
  errorMsg = '';

  constructor(private api: ApiService) { }

  triggerFileInput() {
    if (typeof document !== 'undefined') {
      const input = document.getElementById('recognizeImageInput') as HTMLInputElement;
      input?.click();
    }
  }

  switchInputMode(mode: 'webcam' | 'upload') {
    this.inputMode = mode;
    this.lastBlob = undefined;
    this.uploadedImage = undefined;
    this.uploadedImageUrl = undefined;
  }

  onCaptured(img: Blob) {
    this.lastBlob = img;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.uploadedImage = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedImageUrl = e.target?.result as string;
        this.lastBlob = file as any;
      };
      reader.readAsDataURL(file);
    }
  }

  canSubmit() {
    return !!this.lastBlob && !this.loading;
  }

  recognize() {
    if (!this.lastBlob) return;
    this.loading = true;
    this.errorMsg = '';
    this.result = undefined;
    
    // Use the uploaded file if available, otherwise use the captured blob
    const imageBlob = this.uploadedImage || this.lastBlob;
    
    this.api.recognize({ image: imageBlob, mode: this.mode }).subscribe({
      next: (res) => {
        this.result = res;
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = err?.error?.detail || 'Recognition failed';
        this.loading = false;
      }
    });
  }
}
