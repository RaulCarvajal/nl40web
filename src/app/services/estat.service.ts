import { Injectable } from '@angular/core';
import { uri_port } from './config';
import { HttpClient } from '@angular/common/http';
import { estatificacion } from '../interfaces/estat.interface';


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
}
