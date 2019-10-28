import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { SessionService } from 'src/app/services/session.service';
import { EstatService } from 'src/app/services/estat.service';
import { Router } from '@angular/router';
import { estatificacion, estatificacion_table } from 'src/app/interfaces/estat.interface';

@Component({
  selector: 'app-editar-estatificacion',
  templateUrl: './editar-estatificacion.component.html',
  styleUrls: ['./editar-estatificacion.component.css']
})
export class EditarEstatificacionComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private cats: CatalogosService,
    private session: SessionService,
    private estatService: EstatService,
    private router: Router,
    private location: Location
  ) { }

  formEstat: FormGroup;

  ngOnInit( ) {
    this.getCats();
  }

  tamEmpresa:any[];
  nivVentas:any[];
  detVentas:any[];
  tipoSw:any[];
  certs:any[];
  sectores:any[];
  tipoEmpresa:any[];
  saving:boolean=false;
  error:boolean=false;
  guardado: boolean = false;
  estat: estatificacion_table;

  cargando: boolean = true;

  certis:number[]=[];
  software:number[]=[];

  getCats(){
    this.cats.getTamEmp().subscribe(
      res => {
        this.tamEmpresa = res;
      },err => {
        console.error(err);
      }
    );

    this.cats.getNivelVentas().subscribe(
      res => {
        this.nivVentas = res;
      },err => {
        console.error(err);
      }
    );

    this.cats.getDetalleVentas().subscribe(
      res => {
        this.detVentas = res;
      },err => {
        console.error(err);
      }
    );

    this.cats.getTipoSw().subscribe(
      res => {
        this.tipoSw = res;
      },err => {
        console.error(err);
      }
    );

    this.cats.getCertificaciones().subscribe(
      res => {
        this.certs = res;
      },err => {
        console.error(err);
      }
    );

    this.cats.getSectores().subscribe(
      res => {
        this.sectores = res;
      },err => {
        console.error(err);
      }
    );

    this.cats.getTipoEmp().subscribe(
      res => {
        this.tipoEmpresa = res;
      },err => {
        console.error(err);
      }
    );
    setTimeout(() => {
      this.getEstat();      
    }, 1000);
  }

  update(){
    this.cargando = true;
    this.estatService.update(this.formEstat.value).subscribe(
      res => this.cargando = false,
      err => console.log(err)
    );
  }

  getEstat(){
    this.estatService.getTable(this.session.getEmpresaId()).subscribe(
      res => {
        this.estat = res;
        this.getCertEmp();
        this.getSoftEmp();
        setTimeout(() => {
          this.initForm();          
        }, 1000);
      },
      err => {
        console.error(err);
      }
    );
  }

  getCertEmp(){
    this.estatService.getCertEmp(this.session.getEmpresaId()).subscribe(
      res => {
        res.forEach(e => {
          this.certis.push(e.fk_id_cert);
        })
      },
      err => {
        console.error(err);
      }
    );
  }
  getSoftEmp(){
    this.estatService.getSoftEmp(this.session.getEmpresaId()).subscribe(
      res => {
        res.forEach(e => {
          this.software.push(e.fk_id_sw);
        })
      },
      err => {
        console.error(err);
      }
    );
  }

  initForm(){
    this.formEstat = this.fb.group({
      tamaño_emp :[this.estat.fk_id_tamaño,[Validators.required]],
      nivel_ventas :[this.estat.fk_id_nivel_ventas,[Validators.required]],
      nivel_ventas_sector :[this.estat.fk_id_nivel_ventas,[Validators.required]],
      software :[this.software,[Validators.required]],
      certificaciones :[this.certis,[Validators.required]],
      sector :[this.estat.fk_id_sector,[Validators.required]],
      tipo :[this.estat.fk_id_tipo_empresa,[Validators.required]],
      empresa_id : [this.session.getEmpresaId()],
      id_estat_empresa : [this.estat.id_estat_empresa]
    });

    this.cargando = false;
  }

  return(){
    this.location.back();
  }
}
