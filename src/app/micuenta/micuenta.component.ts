import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CatalogosService } from '../services/catalogos.service';
import { ContactoService } from '../services/contacto.service';
import { puestos } from '../interfaces/puestos.interface';
import { contacto } from '../interfaces/contacto.interface';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { EmpresaService } from '../services/empresa.service';
import { empresa_table } from '../interfaces/empresa_get.interface';

@Component({
  selector: 'app-micuenta',
  templateUrl: './micuenta.component.html',
  styleUrls: ['./micuenta.component.css']
})
export class MicuentaComponent implements OnInit {

  constructor(
    private location: Location,
    private catServices:CatalogosService,
    private contactoService:ContactoService,
    private session: SessionService,
    private router: Router,
    private empresasService: EmpresaService
  ) { }

  ngOnInit() {
    this.getColaborador();
    this.getEmpresas();
  }
  //this.cargando = false;
  puestos:puestos[];
  not_wss = /^\S/;
  cargando: boolean = true;
  colaborador: contacto;
  pass: string = "";
  btndis: boolean = true;
  psw1: string = "";
  psw2: string = "";
  empresa: empresa_table;
  puesto: string = "";

  getColaborador(){
    this.contactoService.getContacto(this.session.getContactoId()).subscribe(
      res => {
        this.colaborador = res;
        this.pass = '❌'.repeat(this.colaborador.contraseña.length);
        this.psw1 = this.session.getPassword();
        this.getPuestos();
        setTimeout(() => {
          this.cargando = false;          
        }, 500);
      },
      err => console.log(err)
    );
  }

  getEmpresas(){
    this.empresasService.getEmpresaTable(this.session.getEmpresaId()).subscribe(
      res => this.empresa = res,
      err => console.log(err)
    );
  }

  getPuestos(){
    this.catServices.getPuestos().subscribe(
      res => {
        this.puestos = res;
        this.puesto = this.puestos.find( e => e.id_puesto == this.colaborador.fk_id_puesto).nombre_puesto;
      },
      err => {
        console.error(err);
    });
  }

  compararPasswords(){
    if(this.psw1 == this.psw2){
      this.btndis = false;
    }else{
      this.btndis = true;
    }
  }

  return(){
    this.location.back();
  }

  routerTo(r : string)
  {
    this.router.navigateByUrl(r);
  }

  entrar(){
    this.hideModal();
    this.routerTo('editar/micuenta');
  }

  hideModal():void {
    document.getElementById('close-modal').click();
  }
}