import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { uri_port } from './config'
import { ContactoService } from './contacto.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private http: HttpClient,
    private contactoService: ContactoService
  ) { }

  login(data:any){
    return this.http.post<any>(`http://${uri_port.url}:${uri_port.port}/api/login`,data);
  }

  getById(){
    return this.http.get<any>(`http://${uri_port.url}:${uri_port.port}/api/contactos/${this.getContactoId()}`);
  }
  updateSession(){
    this.getById().subscribe(
      res => {
        sessionStorage.setItem('contacto' ,JSON.stringify(res));
      },
      err => {
        console.error(err);
      }
    );
  }

  isLoged():boolean{
    if(!sessionStorage.length){
      return false;
    }else{
      return true;
    }
  }

  saveSession(res : any){
    sessionStorage.setItem('contacto' ,JSON.stringify(res));
  }

  getContactoId():number{
    return JSON.parse(sessionStorage.getItem('contacto')).id_contacto;
  }
  getContactoName():string{
    return JSON.parse(sessionStorage.getItem('contacto')).nombres;
  }
  getUsername():string{
    return JSON.parse(sessionStorage.getItem('contacto')).nombre_usuario;
  }
  getPassword():string{
    return JSON.parse(sessionStorage.getItem('contacto')).contraseña;
  }
  getTipoUsuario():string{
    return JSON.parse(sessionStorage.getItem('contacto')).tipo_usuario;
  }

  getRegStatus():number{
    return JSON.parse(sessionStorage.getItem('contacto')).estatus_registro;
  }
  
  getEmpresaId():number{
    return JSON.parse(sessionStorage.getItem('contacto')).fk_id_empresa;
  }

  closeSession(){
    sessionStorage.clear();
  }
}
