import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { ContactoService } from 'src/app/services/contacto.service';
import { SessionService } from 'src/app/services/session.service';
import { puestos } from 'src/app/interfaces/puestos.interface';
import { CorreosService } from 'src/app/services/correos.service';

@Component({
  selector: 'app-agregar-colaborador',
  templateUrl: './agregar-colaborador.component.html',
  styleUrls: ['./agregar-colaborador.component.css']
})
export class AgregarColaboradorComponent implements OnInit {

  constructor(
    private location: Location,
    private fb: FormBuilder, 
    private catServices:CatalogosService,
    private contactoService:ContactoService,
    private session:SessionService,
    private correos: CorreosService
  ) { }

  newUserForm: FormGroup;
  puestos:puestos[];
  not_wss = /^\S/;
  prs: boolean = false;

  ngOnInit() {
    this.getPuestos();

    this.newUserForm =  this.fb.group({
      nombre_usuario : [this.generarString()],
      contraseña : [this.generarString()],
      nombres : ['',[Validators.required,Validators.maxLength(50),Validators.pattern(this.not_wss)]],
      apellidos : ['',[Validators.required,Validators.maxLength(50),Validators.pattern(this.not_wss)]],
      fk_id_puesto : ['',[Validators.required]],
      telefono : ['',[Validators.required, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),Validators.maxLength(20),Validators.minLength(10)]],
      email : ['',[Validators.required, Validators.email,Validators.maxLength(30)]],
      tipo_usuario : ['colaborador'],
      estatus_registro : [6],
      fk_id_empresa: [this.session.getEmpresaId()]
    });
  }

  getPuestos(){
    this.catServices.getPuestos().subscribe(
      res => {
        this.puestos = res;
      },
      err => {
        console.error(err);
    });
  }

  generarString(): String{
    let caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
    let contraseña = "";
    for (let i=0; i<10; i++) contraseña +=caracteres.charAt(Math.floor(Math.random()*caracteres.length)); 
    return contraseña;
  }
  registrar(){
    this.prs = true;
    let formdata = this.newUserForm.value;
    this.contactoService.saveColaborador(formdata).subscribe(
      res => {
        this.correos.registroColaborador(
          {
            "email_origen" : formdata.email,
            "nombre" : formdata.nombres,
            "usuario" : formdata.nombre_usuario,
            "contra" : formdata.contraseña
          }
        ).subscribe(res => this.return(),err => {});
      },
      err => console.log(err)
    )
  }
  return(){
    this.location.back();
  }
}
