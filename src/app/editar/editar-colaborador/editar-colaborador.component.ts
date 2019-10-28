import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { ContactoService } from 'src/app/services/contacto.service';
import { puestos } from 'src/app/interfaces/puestos.interface';
import { Location } from '@angular/common';
import { contacto } from 'src/app/interfaces/contacto.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-colaborador',
  templateUrl: './editar-colaborador.component.html',
  styleUrls: ['./editar-colaborador.component.css']
})
export class EditarColaboradorComponent implements OnInit {

  constructor(
    private location: Location,
    private fb: FormBuilder, 
    private catServices:CatalogosService,
    private contactoService:ContactoService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getPuestos();
    this.getColaborador();
  }

  newUserForm: FormGroup; 
  puestos:puestos[];
  not_wss = /^\S/;
  cargando: boolean = true;
  colaborador: contacto;

  initForm(){
    this.newUserForm =  this.fb.group({
      nombre_usuario : [this.colaborador.nombre_usuario,[Validators.required,Validators.minLength(8),Validators.maxLength(30),Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      contraseña : [this.colaborador.contraseña,[Validators.required,Validators.minLength(6),Validators.maxLength(12),Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      nombres : [this.colaborador.nombres,[Validators.required,Validators.maxLength(50),Validators.pattern(this.not_wss)]],
      apellidos : [this.colaborador.apellidos,[Validators.required,Validators.maxLength(50),Validators.pattern(this.not_wss)]],
      fk_id_puesto : [this.colaborador.fk_id_puesto,[Validators.required]],
      telefono : [this.colaborador.telefono,[Validators.required, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),Validators.maxLength(20),Validators.minLength(10)]],
      email : [this.colaborador.email,[Validators.required, Validators.email,Validators.maxLength(30)]],
      tipo_usuario : ['colaborador'],
      id_contacto: [this.colaborador.id_contacto]
    });
    this.cargando = false;
  }

  getColaborador(){
    this.contactoService.getContacto(+this.activatedRoute.snapshot.paramMap.get("id")).subscribe(
      res => {
        this.colaborador = res;
        this.initForm();
      },
      err => console.log(err)
    );
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

  registrar(){
    this.cargando = true;
    let formdata = this.newUserForm.value;
    this.contactoService.updtColaborador(formdata).subscribe(
      res => {
        this.cargando = false;
      },
      err => console.log(err)
    )
  }
  return(){
    this.location.back();
  }

}
