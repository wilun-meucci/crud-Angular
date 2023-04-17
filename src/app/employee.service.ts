import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ServerData } from './types/employee';
import { Observable } from 'rxjs';
import { retry,catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  getData(url: string, page?: number, size?: number,): Observable<ServerData>
  {
    const params = new HttpParams()
    .set('page', page || 0)
    .set('size',size || 10)
    return this.http.get<ServerData>(url,{params: params});
  }
  delete(urlWithId :string): Observable<any> {
    return this.http.delete(urlWithId, {});
  }

  edit(urlWithId :string): Observable<any> {
    return this.http.put(urlWithId, {});
  }
}
