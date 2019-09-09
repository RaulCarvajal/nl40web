import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { puestos } from 'src/app/interfaces/puestos.interface';
import { contacto } from 'src/app/interfaces/contacto.interface';
import { ContactoService } from 'src/app/services/contacto.service';
import { SessionService } from 'src/app/services/session.service';

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
    private session:SessionService) {
   }

  ngOnInit() {
    this.loged();
    this.newUserForm =  this.fb.group({
      nombre_usuario : ['',[Validators.required]],
      contraseña : ['',[Validators.required]],
      nombres : ['',[Validators.required]],
      apellidos : ['',[Validators.required]],
      fk_id_puesto : ['',[Validators.required]],
      telefono : ['',[Validators.required, Validators.pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)]],
      email : ['',[Validators.required, Validators.email]],
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
