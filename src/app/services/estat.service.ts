import { Injectable } from '@angular/core';
import { uri_port } from './config';
import { HttpClient } from '@angular/common/http';
import { estatificacion, estatificacion_table, cert_emp, soft_emp } from '../interfaces/estat.interface';


@Injectable({
  providedIn: 'root'
})
export class EstatService {

  constructor(
    private http: HttpClient
  ) { }

  add(data:any){
    return this.http.post<any>(`http://${uri_port.url}:${uri_port.port}/api/estatificacion`,data);
  }

  get(id: number){
    return this.http.get<estatificacion[]>(`http://${uri_port.url}:${uri_port.port}/api/estatificacion/${id}`);
  }

  update(data:any){
    return this.http.put<any>(`http://${uri_port.url}:${uri_port.port}/api/estatificacion`,data);
  }

  getTable(id: number){
    return this.http.get<estatificacion_table>(`http://${uri_port.url}:${uri_port.port}/api/estatificacion_table/${id}`);
  }

  getCertEmp(id: number){
    return this.http.get<cert_emp[]>(`http://${uri_port.url}:${uri_port.port}/api/cert_emp/${id}`);
  }
  getSoftEmp(id: number){
    return this.http.get<soft_emp[]>(`http://${uri_port.url}:${uri_port.port}/api/soft_emp/${id}`);
  }

}
