import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { contacto } from '../interfaces/contacto.interface';
import { uri_port } from './config';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor(
    private http: HttpClient
    ) { }
  
  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  add(data : contacto){
    return this.http.post<any>(`http://${uri_port.url}:${uri_port.port}/api/contactos`,data)
  }

}
