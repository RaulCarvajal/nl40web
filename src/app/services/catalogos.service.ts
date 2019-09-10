import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { uri_port } from './config'

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(private http: HttpClient) { 
  }
  
  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  getPuestos(){
    return this.http.get<any[]>(`http://${uri_port.url}:${uri_port.port}/api/cats/puestos`,this.httpOptions);
  }

  getTamEmp(){
    return this.http.get<any[]>(`http://${uri_port.url}:${uri_port.port}/api/cats/tam_empresa`,this.httpOptions)
  }

  getNivelVentas(){
    return this.http.get<any[]>(`http://${uri_port.url}:${uri_port.port}/api/cats/nivel_ventas`,this.httpOptions)
  }

  getDetalleVentas(){
    return this.http.get<any[]>(`http://${uri_port.url}:${uri_port.port}/api/cats/det_ventas`,this.httpOptions)
  }

  getTipoSw(){
    return this.http.get<any[]>(`http://${uri_port.url}:${uri_port.port}/api/cats/tipo_sw`,this.httpOptions)
  }

  getCertificaciones(){
    return this.http.get<any[]>(`http://${uri_port.url}:${uri_port.port}/api/cats/certificaciones`,this.httpOptions)
  }

  getSectores(){
    return this.http.get<any[]>(`http://${uri_port.url}:${uri_port.port}/api/cats/sectores`,this.httpOptions)
  }

  getTipoEmp(){
    return this.http.get<any[]>(`http://${uri_port.url}:${uri_port.port}/api/cats/tipo_empresa`,this.httpOptions)
  }

  getEstadosMex(){
    return this.http.get<any[]>(`http://${uri_port.url}:${uri_port.port}/api/cats/estados_mex`,this.httpOptions)
  }

  getMunicipiosMex(id:number){
    return this.http.get<any[]>(`http://${uri_port.url}:${uri_port.port}/api/cats/municipios?id=${id}`,this.httpOptions)
  }

  getPaises(){
    return this.http.get<any[]>(`http://${uri_port.url}:${uri_port.port}/api/cats/paises`,this.httpOptions)
  }

  getSectoresAntendidos(){
    return this.http.get<any[]>(`http://${uri_port.url}:${uri_port.port}/api/cats/sectores_atendidos`,this.httpOptions)
  }

  getOrgEmpresariales(){
    return this.http.get<any[]>(`http://${uri_port.url}:${uri_port.port}/api/cats/organizaciones`,this.httpOptions)
  }

  getTipoSede(){
    return this.http.get<any[]>(`http://${uri_port.url}:${uri_port.port}/api/cats/tipo_sede`,this.httpOptions)
  }

  getTipoProd(){
    return this.http.get<any[]>(`http://${uri_port.url}:${uri_port.port}/api/cats/tipo_producto`,this.httpOptions)
  }

  getTecnologias(){
    return this.http.get<any[]>(`http://${uri_port.url}:${uri_port.port}/api/cats/tecnologias`,this.httpOptions)
  }
  
  getNivelPS(){
    return this.http.get<any[]>(`http://${uri_port.url}:${uri_port.port}/api/cats/nivel_partnership`,this.httpOptions)
  }

  getPosicionamiento(){
    return this.http.get<any[]>(`http://${uri_port.url}:${uri_port.port}/api/cats/posicionamiento`,this.httpOptions)
  }
}
