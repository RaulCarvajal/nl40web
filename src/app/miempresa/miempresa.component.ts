import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { EmpresaService } from '../services/empresa.service';
import { empresa_get } from '../interfaces/empresa_get.interface';
import * as moment from 'moment';
import { DireccionesService } from '../services/direcciones.service';
import { direccion_get } from '../interfaces/direcciones_get.interface';

@Component({
  selector: 'app-miempresa',
  templateUrl: './miempresa.component.html',
  styleUrls: ['./miempresa.component.css']
})
export class MiempresaComponent implements OnInit {

  constructor(
    private session: SessionService,
    private empresas: EmpresaService,
    private direccionesService: DireccionesService,
  ) { }

  ngOnInit() {
    this.getEmpresa();
    this.getDirs();
  }

  empresa:empresa_get;
  estados:string[];
  paises:string[];
  desde:string;
  fecha:string;
  direcciones:direccion_get[];

  getEmpresa(){
    this.empresas.get(this.session.getEmpresaId()).subscribe(
      res => {
        this.empresa = res[0];
        this.getEstadosArr();
        this.getPaisesArr();
        this.getDates();
      },
      err => {
        console.error(err);
      }
    );
  }
  
  getDirs(){
    this.direccionesService.get(this.session.getEmpresaId()).subscribe(
      res => {
        this.direcciones = res;
        console.log(this.direcciones);
      },
      err => {
        console.error(err);
      }
    );
  }

  getEstadosArr(){
    this.estados = this.empresa.cobertura_nacional.split(',');
    this.estados.shift();
  }
  getPaisesArr(){
    this.paises = this.empresa.cobertura_internacional.split(',');
    this.paises.shift();
  }

  getDates(){
    var fecha_creacion = moment(this.empresa.fecha_creacion.replace('T',' ').slice(0,16)).locale('es');
    this.desde = fecha_creacion.fromNow();
    this.fecha = fecha_creacion.toLocaleString().slice(3,16);
  }
}
