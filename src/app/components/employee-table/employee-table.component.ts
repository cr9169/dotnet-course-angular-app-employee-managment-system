import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../../models/employee';
import { catchError, finalize, of, throwError } from 'rxjs';

@Component({
  selector: 'app-employee-table',
  imports: [],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss',
})
export class EmployeeTableComponent {
  employees!: Employee[];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    // Set loading state to true to show loading indicator/spinner
    this.isLoading = true;

    // Call the employee service to get all employees
    this.employeeService
      .getAll()
      .pipe(
        // finalize runs regardless of success/error, used to turn off loading state
        finalize(() => (this.isLoading = false)),
        // Handle potential errors in the stream
        catchError((err) => {
          // If server returns 404 (Not Found) status
          if (err.status === 404) {
            // Set user-friendly error message
            this.errorMessage = "Can't find employees...";
            // Return empty array to prevent stream from breaking
            return of([]);
          }
          // For other errors, rethrow them to be handled in error callback
          return throwError(() => err);
        })
      )
      // Subscribe to the Observable to start the HTTP request
      .subscribe({
        // Success callback - receives the employee data
        next: (data) => {
          // Store received employees in component property
          this.employees = data;
        },
        // Error callback - handles any unhandled errors from the stream
        error: (err) => {
          // Set generic error message for user
          this.errorMessage = 'An error occurred, try again later.';
          // Log detailed error to console for debugging
          console.error(`Subscription Error: ${err}`);
        },
      });
  }
}
