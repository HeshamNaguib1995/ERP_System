import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../Services/employee-service';
import { Employee } from '../../Models/employee';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-employee-component',
  imports: [CommonModule],
  templateUrl: './employee-component.html',
  styleUrl: './employee-component.css'
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.getAll().subscribe((data) => {
      this.employees = data;
    });
  }
  

}
