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
  displayedCollumns: string [] = ["id", "birthDate","firstName","lastName","gender","hireDate"]

  
  constructor(private employeeService: EmployeeService){
    this.loadData("http://localhost:9000/employees");
    this.dataSource = new MatTableDataSource(this.data?._embedded.employees);
  }

  loadData(url: string)
  {
    this.employeeService.getData(url).subscribe(
      ServeResponse => {
        this.data = ServeResponse;
        this.dataSource.data = this.data._embedded.employees;
      }
    )
  }
}
