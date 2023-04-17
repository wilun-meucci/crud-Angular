import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import {MatTableDataSource} from '@angular/material/table';
import { Employee, ServerData } from '../types/employee';



@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent {
  data: ServerData | undefined;
  dataSource: MatTableDataSource<Employee>
  displayedCollumns: string [] = ["id", "birthDate","firstName","lastName","gender","hireDate", "elimina","modifica"];
  currentUrl: string = "http://localhost:8080/employees";
  currentEmployee: Employee | undefined;

  
  constructor(private employeeService: EmployeeService){
    this.loadData(this.currentUrl);
    this.dataSource = new MatTableDataSource(this.data?._embedded.employees);
  }

  newEmployee() {
    this.currentEmployee = {id: 0, firstName:"", lastName: "", hireDate: "", birthDate: "", gender: ""};
    //this.currentEmployee
  }

  loadData(url: string) 
  {
    this.currentUrl = url;
    this.employeeService.getData(url).subscribe(
      ServeResponse => {
        this.data = ServeResponse;
        this.dataSource.data = this.data._embedded.employees;
      }
    )
  }


  deleteFn(urlWithId: string) 
  {
    this.employeeService.delete(urlWithId).subscribe( (data) => {
        this.loadData(this.currentUrl);
      }
    );
  }



  firstPage(){
    if (this.data) this.loadData(this.data._links.first.href);
  }
  prevPage(){
    if (this.data) this.loadData(this.data._links.prev.href);
  }
  nextPage(){
    if (this.data) this.loadData(this.data._links.next.href);
  }
  lastPage(){
    if (this.data) this.loadData(this.data._links.last.href);
  }
}
