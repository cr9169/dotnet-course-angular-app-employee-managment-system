import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent {
  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    position: '',
  };
  errorMessage: string = '';

  constructor(private employeeService: EmployeeService) {}

  onSubmit(): void {
    console.log(this.employee);
    this.employeeService.AddEmployee(this.employee);
  }
}
