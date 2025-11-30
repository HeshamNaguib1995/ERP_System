import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { DailyAttendance } from '../Models/daily-attendance';
import { SummaryAttendance } from '../Models/summary-attendance';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
    private base = environment.apiUrl +'Attendance';

  constructor(private http: HttpClient) {}

  getDailyAttendance(Date: string) : Observable<DailyAttendance[]> {
    return this.http.get<DailyAttendance[]>(`${this.base}/daily`, {
      params: { Date }
    });
  }

  getSummary(month: number, year: number): Observable<SummaryAttendance[]> {
    return this.http.get<SummaryAttendance[]>(`${this.base}/summary`, {
      params: { month, year }
    });
  }
}
