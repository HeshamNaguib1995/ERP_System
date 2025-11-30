import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../Services/attendance-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SummaryAttendance } from '../../Models/summary-attendance';
@Component({
  selector: 'app-attendance-component',
  imports: [CommonModule,FormsModule],
  templateUrl: './attendance-component.html',
  styleUrl: './attendance-component.css',
})
export class AttendanceComponent implements OnInit {
  activeTab: 'daily' | 'summary' = 'daily';

  today = new Date();
  dayDate = this.today.toISOString().split('T')[0];  // YYYY-MM-DD

  dailyData: any[] = [];
  summaryData: SummaryAttendance[] = [];

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit(): void {
    this.loadDaily();
  }

  changeTab(tab: 'daily' | 'summary') {
    this.activeTab = tab;
    if (tab === 'daily') this.loadDaily();
    if (tab === 'summary') this.loadSummary();
  }

  loadDaily() {
    this.attendanceService.getDailyAttendance(this.dayDate)
      .subscribe(res => this.dailyData = res);
  }

  loadSummary() {
    const month = this.today.getMonth() + 1;
    const year = this.today.getFullYear();

    this.attendanceService.getSummary(month, year)
      .subscribe(res => this.summaryData = res);
  }
}
