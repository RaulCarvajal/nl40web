import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { uri_port } from './config';
import { direccion_get } from '../interfaces/direcciones_get.interface';

@Injectable({
  providedIn: 'root'
})
export class DireccionesService {

  constructor(
    private http:HttpClient
  ) { }

    save(data: any){
      return this.http.post<any>(`http://${uri_port.url}:${uri_port.port}/api/direcciones`,data);
    }

    get(id: number){
      return this.http.get<direccion_get[]>(`http://${uri_port.url}:${uri_port.port}/api/direcciones/${id}`);
    }

    delete(id: number){
      return this.http.delete<any>(`http://${uri_port.url}:${uri_port.port}/api/direcciones/${id}`);
    }

    update(data: any){
      return this.http.put<any>(`http://${uri_port.url}:${uri_port.port}/api/direcciones`,data);
    }

    existeDirFiscal(id:number){
      return this.http.get<boolean>(`http://${uri_port.url}:${uri_port.port}/api/existeDirFiscal/${id}`);
    }
}
