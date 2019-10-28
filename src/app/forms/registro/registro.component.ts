import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { puestos } from 'src/app/interfaces/puestos.interface';
import { contacto } from 'src/app/interfaces/contacto.interface';
import { ContactoService } from 'src/app/services/contacto.service';
import { SessionService } from 'src/app/services/session.service';
import { CorreosService } from 'src/app/services/correos.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor( 
    private router: Router, 
    private fb: FormBuilder, 
    private catServices:CatalogosService,
    private contactoService:ContactoService,
    private session:SessionService,
    private correos: CorreosService) {
   }

  ngOnInit() {
    this.loged();
    this.newUserForm =  this.fb.group({
      nombre_usuario : ['',[Validators.required,Validators.minLength(8),Validators.maxLength(30),Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      contraseña : ['',[Validators.required,Validators.minLength(6),Validators.maxLength(12),Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      nombres : ['',[Validators.required,Validators.maxLength(50),Validators.pattern(this.not_wss)]],
      apellidos : ['',[Validators.required,Validators.maxLength(50),Validators.pattern(this.not_wss)]],
      fk_id_puesto : ['',[Validators.required]],
      telefono : ['',[Validators.required, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),Validators.maxLength(20),Validators.minLength(10)]],
      email : ['',[Validators.required, Validators.email,Validators.maxLength(30)]],
      tipo_usuario : ['admin'],
      estatus_registro : [2]
    });
    this.getPuestos();
  }

  newUserForm: FormGroup;
  pss: String = ""
  sp: Boolean = true;
  puestos:puestos[];
  registrando:boolean = true;
  not_wss = /^\S/;

  getPuestos(){
    this.catServices.getPuestos().subscribe(
      res => {
        this.puestos = res;
      },
      err => {
        console.error(err);
    });
  }

  routeTo(r: string){
    this.router.navigateByUrl(r);
  }

  registrar(){
    let formdata = this.newUserForm.value;
    this.registrando = false;
    this.contactoService.add(formdata).subscribe(
      res => {
        this.correos.registro(
          {
            "email_origen" : formdata.email,
            "nombre" : formdata.nombres,
            "usuario" : formdata.nombre_usuario,
            "contra" : formdata.contraseña
          }
        ).subscribe(res => {},err => {});
        setTimeout(() => {
          this.session.saveSession(res);
          this.routeTo('inicio');
        }, 1500);
      },
      err => {
        console.log(err)
      }
    )
  }

  loged(){
    if(this.session.isLoged()){
      this.routeTo('inicio');
    }
  }

  samePassword(){
    const temp = this.newUserForm.value;
    if(temp.contraseña==this.pss){
      this.sp = true;
    }else{
      this.sp = false;
    }
  }
}
