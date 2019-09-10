import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { uri_port } from './config';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(
    private http: HttpClient
  ) { }

  add(data:any){
    return this.http.post<any>(`http://${uri_port.url}:${uri_port.port}/api/productos`,data);
  }

}
