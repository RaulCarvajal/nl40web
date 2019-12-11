import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { uri_port } from './config';
import { producto_basico, producto, producto_tabla, producto_tecnologias } from '../interfaces/productos.interface';
import { val_ind, val_indTable } from '../interfaces/val_ind.interface';


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

  get(id: number){
    return this.http.get<producto[]>(`http://${uri_port.url}:${uri_port.port}/api/productos/${id}`);
  }

  getBasico(id: number){
    return this.http.get<producto_basico[]>(`http://${uri_port.url}:${uri_port.port}/api/productosbasicos/${id}`);
  }

  getById(id: number){
    return this.http.get<producto[]>(`http://${uri_port.url}:${uri_port.port}/api/producto/${id}`);
  }

  saltarProductos(id: number){
    return this.http.get<producto[]>(`http://${uri_port.url}:${uri_port.port}/api/siguiente_paso/${id}`);
  }

  delete(id: number){
    return this.http.delete<any>(`http://${uri_port.url}:${uri_port.port}/api/producto/${id}`);
  }

  update(data: any){
    return this.http.put<any>(`http://${uri_port.url}:${uri_port.port}/api/producto`,data);
  }

  getValInd(id: number){
    return this.http.get<val_ind[]>(`http://${uri_port.url}:${uri_port.port}/api/val_ind/${id}`);
  }

  getValIndTable(id: number){
    return this.http.get<val_indTable[]>(`http://${uri_port.url}:${uri_port.port}/api/valindtable/${id}`);
  }

  getProductoTabla(id : number){
    return this.http.get<producto_tabla>(`http://${uri_port.url}:${uri_port.port}/api/producto_tabla/${id}`);
  }

  getTecnologiaProducto(id : number){
    return this.http.get<producto_tecnologias[]>(`http://${uri_port.url}:${uri_port.port}/api/tecprod/${id}`);
  }
  getMarca(id : number){
    return this.http.get<any>(`http://${uri_port.url}:${uri_port.port}/api/marca/${id}`);
  }
}
