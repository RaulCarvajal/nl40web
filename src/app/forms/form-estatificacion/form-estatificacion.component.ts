import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { SessionService } from 'src/app/services/session.service';
import { EstatService } from 'src/app/services/estat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-estatificacion',
  templateUrl: './form-estatificacion.component.html',
  styleUrls: ['./form-estatificacion.component.css']
})
export class FormEstatificacionComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private cats: CatalogosService,
    private session: SessionService,
    private estat: EstatService,
    private router: Router
  ) { }

  formEstat: FormGroup;

  ngOnInit() {
    this.formEstat = this.fb.group({
      tamaño_emp :['',[Validators.required]],
      nivel_ventas :['',[Validators.required]],
      nivel_ventas_sector :['',[Validators.required]],
      software :['',[Validators.required]],
      certificaciones :['',[Validators.required]],
      sector :['',[Validators.required]],
      tipo :['',[Validators.required]],
      empresa_id : this.session.getEmpresaId(),
      contacto_id : this.session.getContactoId()
    });

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
  }

  save(){
    this.saving = true;
    console.log(this.formEstat.value);
    this.estat.add(this.formEstat.value).subscribe(
      res => {
        console.log(res);
        this.session.updateSession();
        this.router.navigateByUrl('landing');
        this.saving = false;
      },
      err => {
        this.error=true;
        console.error(err);
      }
    );
  }
}
