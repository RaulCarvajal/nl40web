import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { uri_port } from './config';
import { empresa_get, empresa_table } from '../interfaces/empresa_get.interface';
import { info_gnlr } from '../interfaces/empresa.interface';

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

  getInfoGnrl(id:number){
    return this.http.get<info_gnlr[]>(`http://${uri_port.url}:${uri_port.port}/api/info_gnrl/${id}`);
  }

  getEmpresaTable(id:number){
    return this.http.get<empresa_table>(`http://${uri_port.url}:${uri_port.port}/api/empresa_updt/${id}`);
  }

  update(data:any){
    return this.http.put<any>(`http://${uri_port.url}:${uri_port.port}/api/empresa_updt`,data);
  }
  
}
