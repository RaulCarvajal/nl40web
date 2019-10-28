import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { EmpresaService } from '../../services/empresa.service';
import { empresa_get } from '../../interfaces/empresa_get.interface';
import * as moment from 'moment';
import { DireccionesService } from '../../services/direcciones.service';
import { direccion_get } from '../../interfaces/direcciones_get.interface';
import { producto } from '../../interfaces/productos.interface';
import { ProductosService } from '../../services/productos.service';
import { info_gnlr } from '../../interfaces/empresa.interface';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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
    private router: Router,
    private location: Location
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

  certs:string[]=[];
  software:string[]=[];
  sectores_a:string[]=[];
  organizaciones:string[]=[];
  info_gnrl: info_gnlr;

  cargando: boolean = true;
  nullpt: boolean = true;
  nullpp: boolean = true;
  nulldirs: boolean = true;

  getEmpresa(){
    this.empresas.get(this.session.getEmpresaId()).subscribe(
      res => {
        this.empresa = res[0];
        this.getEstadosArr();
        this.getPaisesArr();
        this.getDates();
        this.getInfoGnrl();
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
        if(this.direcciones.length != 0){
          this.nulldirs = false;
        }
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
  
  getSectoresAtendidos(){
    this.sectores_a = this.info_gnrl.sectores_atendidos.split(',');
    this.sectores_a.shift();
  }
  getOrganizaciones(){ 
    this.organizaciones = this.info_gnrl.organizaciones.split(',');
  }
  getDates(){
    var fecha_creacion = moment(this.empresa.fecha_creacion.replace('T',' ').slice(0,16)).locale('es');
    this.desde = fecha_creacion.fromNow();
    this.fecha = fecha_creacion.format('dddd, MMMM Do YYYY');
    this.fecha =  this.fecha.charAt(0).toUpperCase()+this.fecha.slice(1);
  }
  tabString(strn: string): string{
    return strn.slice(0,20) + '...';
  }
  getInfoGnrl(){
    this.empresas.getInfoGnrl(this.session.getEmpresaId()).subscribe(
      res => {
        this.info_gnrl = res[0];
        this.getSectoresAtendidos();
        this.getOrganizaciones();
        this.cargando = false;
      },err => {
        console.error(err);
      }
    );
  }
  routerTo(r : string)
  {
    this.router.navigateByUrl(r);
  }
  return(){
    this.location.back();
  }
}
