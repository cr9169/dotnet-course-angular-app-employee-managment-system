import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';

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

  isEditing: boolean = false;

  errorMessage: string = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private currentRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.currentRoute.paramMap.subscribe((res) => {
      const id = res.get('id');
      if (id) {
        this.isEditing = true;
        this.employeeService.getById(Number(id)).subscribe({
          next: (res) => {
            this.employee = res;
          },
          error: (err) => {
            console.error(`An error occurred: ${err.message}`);
            this.errorMessage = `An error occurred: ${err.status} ${err.message}`;
          },
        });
      }
    });
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.employeeService.updateEmployee(this.employee).subscribe({
        next: (res) => {
          console.log(`Successfully updated employee!`);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(`An error occurred: ${err.message}`);
          this.errorMessage = `An error occurred: ${err.status} ${err.message}`;
        },
      });
    } else {
      this.employeeService.addEmployee(this.employee).subscribe({
        next: (res) => {
          console.log(`Successfully created employee!`);
          // Uses the forms two way data binding to show the current employee's values in the form inputs.
          this.employee = res;
        },
        error: (err) => {
          console.error(`An error occurred: ${err.message}`);
          this.errorMessage = `An error occurred: ${err.status} ${err.message}`;
        },
      });
    }
  }
}
