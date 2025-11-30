import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from "../../employee-component/employee-component";
import { AttendanceComponent } from "../../attendance-component/attendance-component";
@Component({
  selector: 'app-hr-dashboard',
  imports: [CommonModule, EmployeeComponent, AttendanceComponent],
  templateUrl: './hr-dashboard.html',
  styleUrl: './hr-dashboard.css',
})
export class HrDashboard {
 selectedSection : string ='';
  selectSection(section: string) {
    this.selectedSection = section;
  }
}
