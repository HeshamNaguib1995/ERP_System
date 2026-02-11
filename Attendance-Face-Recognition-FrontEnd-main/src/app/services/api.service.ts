import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  health(): Observable<{ status: string }> {
    return this.http.get<{ status: string }>(`${this.baseUrl}/health`);
  }

  employees(): Observable<Array<{ employee_id: string; employee_name: string }>> {
    return this.http.get<Array<{ employee_id: string; employee_name: string }>>(`${this.baseUrl}/employees`);
  }

  enroll(payload: {
    employee_id: string;
    employee_name: string;
    images: Blob[]; // exactly 5
  }): Observable<{ stored_samples: number }> {
    const fd = new FormData();
    fd.append('employee_id', payload.employee_id);
    fd.append('employee_name', payload.employee_name);
    // API expects image1..image5
    for (let i = 0; i < 5; i++) {
      const index = i + 1;
      const blob = payload.images[i];
      fd.append(`image${index}`, blob, `image${index}.jpg`);
    }
    return this.http.post<{ stored_samples: number }>(`${this.baseUrl}/enroll`, fd);
  }

  recognize(payload: { image: Blob; mode: 'checkin' | 'checkout' }): Observable<{
    employee_id?: string;
    employee_name?: string;
    similarity?: number;
    mode: string;
    recognized: boolean;
  }> {
    const fd = new FormData();
    fd.append('mode', payload.mode);
    fd.append('image', payload.image, 'image.jpg');
    return this.http.post<{
      employee_id?: string;
      employee_name?: string;
      similarity?: number;
      mode: string;
      recognized: boolean;
    }>(`${this.baseUrl}/recognize`, fd);
  }
}
