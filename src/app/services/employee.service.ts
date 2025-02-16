import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Employee } from '../../models/employee';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiConnectionString: string = `${environment.apiUrl}/employee`;

  constructor(private httpClient: HttpClient) {}

  // Function that returns an Observable of Employee array
  getAll(): Observable<Employee[]> {
    // Make HTTP GET request to the API endpoint
    return this.httpClient.get<Employee[]>(this.apiConnectionString).pipe(
      // Error handling operator
      catchError((err: Error) => {
        // Log error message to console for debugging
        console.error(`An error occurred: ${err.message}`);
        // Create new Observable that emits the error
        return throwError(() => err);
      })
    );
  }

  getById(id: number): Observable<Employee> {
    return this.httpClient
      .get<Employee>(`${this.apiConnectionString}/${id}`)
      .pipe(
        catchError((err: Error) => {
          console.error(`An error occurred: ${err.message}`);
          return throwError(() => err);
        })
      );
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient
      .post<Employee>(this.apiConnectionString, employee)
      .pipe(
        catchError((err: Error) => {
          console.error(`An error occurred: ${err.message}`);
          return throwError(() => err);
        })
      );
  }

  deleteEmployee(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.apiConnectionString}/${id}`)
      .pipe(
        catchError((err: Error) => {
          console.error(`An error occurred: ${err.message}`);
          return throwError(() => err);
        })
      );
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient
      .put<Employee>(`${this.apiConnectionString}/${employee.id}`, employee)
      .pipe(
        catchError((err: Error) => {
          console.error(`An error occurred: ${err.message}`);
          return throwError(() => err);
        })
      );
  }
}
