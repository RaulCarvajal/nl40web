import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { uri_port } from './config';
import { empresa_get } from '../interfaces/empresa_get.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(
    private http: HttpClient
  ) { }

  add(data:any){
    return this.http.post<any>(`http://${uri_port.url}:${uri_port.port}/api/empresas`,data);
  }

  get(id:number){
    return this.http.get<empresa_get[]>(`http://${uri_port.url}:${uri_port.port}/api/empresas/${id}`);
  }
}
