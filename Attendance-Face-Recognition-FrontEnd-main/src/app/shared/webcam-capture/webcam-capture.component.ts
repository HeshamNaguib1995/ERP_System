import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcamImage, WebcamInitError, WebcamModule } from 'ngx-webcam';
import { Subject } from 'rxjs';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-webcam-capture',
  standalone: true,
  imports: [CommonModule, WebcamModule],
  templateUrl: './webcam-capture.component.html',
  styleUrls: ['./webcam-capture.component.scss']
})
export class WebcamCaptureComponent {
  @Output() captured = new EventEmitter<Blob>();
  trigger$ = new Subject<void>();
  lastImageUrl?: string;
  webcamError?: string;

  triggerSnapshot() {
    this.trigger$.next();
  }

  get triggerObservable() {
    return this.trigger$.asObservable();
  }

  handleInitError(err: WebcamInitError) {
    this.webcamError = err.message || 'Could not access webcam';
  }

  handleImage(img: WebcamImage) {
    this.lastImageUrl = img.imageAsDataUrl;
    const blob = this.dataUrlToBlob(img.imageAsDataUrl);
    this.captured.emit(blob);
  }

  private dataUrlToBlob(dataUrl: string): Blob {
    const arr = dataUrl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
}
