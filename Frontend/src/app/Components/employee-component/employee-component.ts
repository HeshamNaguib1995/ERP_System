import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../Services/employee-service';
import { Employee } from '../../Models/employee';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Bank } from '../../Models/bank';
import { EmployeeAdd } from '../../Models/employee-add';
import { City } from '../../Models/city';
import { Position } from '../../Models/position';
import { EmployeeUpdate } from '../../Models/employee-update';

@Component({
  selector: 'app-employee-component',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './employee-component.html',
  styleUrls: ['./employee-component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  employeesSearch: Employee[] = [];
  Banks: Bank[] = [];
  Cities : City[] = [];
  Positions : Position[] = [];
  searchText: string = '';
  employee: EmployeeAdd = {} as EmployeeAdd; // use EmployeeAdd
  EditEmployee: EmployeeUpdate = {} as EmployeeUpdate;
  openForm = false;
  selectedCityName: string = '';
  Editing = false;
  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployees();
    this.GetFormData();
  }

  loadEmployees() {
    this.employeeService.getAll().subscribe((data) => {
      this.employees = data;
      this.employeesSearch = data;
    });
  }
  GetFormData()
  {
      this.employeeService.getBanks().subscribe((data) => {
      this.Banks = data;
      console.log('Banks loaded:', this.Banks);
    });
    this.employeeService.getCities().subscribe((data) => {
      this.Cities = data;
      console.log('Cities loaded:', this.Cities);
    });
    this.employeeService.getPositions().subscribe((data) => {
      this.Positions = data;
      console.log('Positions loaded:', this.Positions);
    });
  }
  searchData() 
  {
    this.employees = this.employeesSearch.filter(
      emp => emp.fullName.toLowerCase().includes(this.searchText.toLowerCase())||
             emp.positionName.toLowerCase().includes(this.searchText.toLowerCase())||
             emp.bankName.toLowerCase().includes(this.searchText.toLowerCase())
    )          // reload all if search is empty
  // open a fresh form for adding
    }
  openAdd() {
    this.employee = {} as EmployeeAdd;
    this.openForm = true;
  }
  onEditSubmit()
  {
   if (!this.EditEmployee.fullName || !this.EditEmployee.accountNo || !this.EditEmployee.bankId) {
      // you can show a nicer UI message; keep simple here
      alert('Please fill required fields: Full Name, Account No, Bank');
      return;
    }
    // call service to create (assumes employeeService.create exists and accepts EmployeeAdd)
    else 
    {
      this.employeeService.update(this.EditEmployee).subscribe({
        next: (res) => {
          alert('Employee Updated successfully');  
          this.resetForm();    
          this.loadEmployees(); 
    }});
    }
  }
  DeleteEmployee(id: number)
  {
    console.log("delete working");
        this.employeeService.Delete(id).subscribe({
            next: (res) => {alert("Employee Deleted Successfully");
              this.loadEmployees();
            }});
  }
  // submit EmployeeAdd to service
  onSubmit() {
    // basic client-side validation (prevent empty required fields)
    if (!this.employee.fullName || !this.employee.accountNo || !this.employee.bankId) {
      // you can show a nicer UI message; keep simple here
      alert('Please fill required fields: Full Name, Account No, Bank');
      return;
    }
    // call service to create (assumes employeeService.create exists and accepts EmployeeAdd)
    else 
    {
      this.employeeService.create(this.employee).subscribe({
        next: (res) => {
          alert('Employee added successfully');  
          this.resetForm();
          this.loadEmployees();     
    }});
    }
  }
 GetEmployee(id: number) {
    this.employeeService.GetEmpById(id).subscribe((data) => {
      this.EditEmployee = data;
      console.log('Employee loaded for edit:', this.EditEmployee);
      this.Editing = true;
    });
 }
  onCitySelect(event: Event) {
    const input = event.target as HTMLInputElement;
    const selectedCity = this.Cities.find(city => city.name === input.value);
    if (selectedCity) {
      this.employee.cityId = selectedCity.id;
      this.selectedCityName = selectedCity.name;
    }
  }

  resetForm() {
    this.employee = {} as EmployeeAdd;
    this.selectedCityName = '';
    this.openForm = false;
  }
}
