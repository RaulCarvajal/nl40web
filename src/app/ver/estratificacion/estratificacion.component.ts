import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { EstatService } from '../../services/estat.service';
import { estatificacion } from '../../interfaces/estat.interface';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-estratificacion',
  templateUrl: './estratificacion.component.html',
  styleUrls: ['./estratificacion.component.css']
})
export class EstratificacionComponent implements OnInit {

  constructor(
    private router: Router,
    private location: Location,
    private estatService: EstatService,
    private session: SessionService
  ) { }

  cargando: boolean = true;
  estat: estatificacion;
  software: string[] = [];
  certs: string[] = [];

  ngOnInit() {
    this.getEstatificacion();
  }

  getEstatificacion(){
    this.estatService.get(this.session.getEmpresaId()).subscribe(
      res => {
        this.estat = res[0];
        this.getSoftware();
        this.getCerts();
        this.cargando = false;
      },
      err => console.error(err)
    );
  }

  getSoftware(){
    if(this.estat.software ==  null){
      this.software.push('Sin datos registrados');
    }else{
      this.software = this.estat.software.split(',');
    }
  }
  getCerts(){
    if(this.estat.certificaciones ==  null){
      this.certs.push('Sin datos registrados');
    }else{
      this.certs = this.estat.certificaciones.split(',');
    }
  }

  routerTo(r : string)
  {
    this.router.navigateByUrl(r);
  }
  return(){
    this.location.back();
  }
}
