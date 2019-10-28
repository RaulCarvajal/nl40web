import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { DISABLED } from '@angular/forms/src/model';
import { estado } from 'src/app/interfaces/estados.interface';
import { municipio } from 'src/app/interfaces/municipios.interface';
import { SessionService } from 'src/app/services/session.service';
import { DireccionesService } from 'src/app/services/direcciones.service';
import { Router } from '@angular/router';
import { direccion_get } from 'src/app/interfaces/direcciones_get.interface';

@Component({
  selector: 'app-form-direcciones',
  templateUrl: './form-direcciones.component.html',
  styleUrls: ['./form-direcciones.component.css']
})
export class FormDireccionesComponent implements OnInit {
 
  constructor(
    private fb: FormBuilder,
    private catalogos: CatalogosService,
    private session: SessionService,
    private direccionesService: DireccionesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dirForm = this.fb.group({
      direccion : ['',[Validators.required, Validators.maxLength(150)]],
      tipo_sede : ['',[Validators.required]],
      pais : ['México',[Validators.required]],
      estado : ['',[Validators.required]],
      municipio : ['',[Validators.required]],
    });
      /*
      empresa_id : this.session.getEmpresaId(),
      contacto_id : this.session.getContactoId()*/
    this.getTipoSede();
    this.getEstados();
    this.getDirs();
  }

  dirForm: FormGroup;
  tipo_sede: any[];
  paises:any[] = [
    { 'nombre' : 'México'}
  ];
  estados: estado[];
  municipios: municipio[];
  saving:boolean=false;
  error:boolean=false;
  ocultar: boolean = false;
  guardado: boolean = false;
  exdirfis: boolean = false;

  direcciones:direccion_get[];
  nulldirs: boolean = true;


  get getDirecciones(){ 
    return this.dirForm.get('direcciones') as FormArray;
  }
  getTipoSede(){
    this.catalogos.getTipoSede().subscribe(
      res => {
        this.tipo_sede = res;
        this.existeDirFiscal();
      },
      err => {
        console.error(err)
      }
    );
  }
  getEstados(){
    this.catalogos.getEstadosMex().subscribe(
      res => {
        this.estados =  res;
      }, err => {
        console.error(err);
      }
    );
  }
  getMunicipio(){
    this.catalogos.getMunicipiosMex(this.dirForm.value.estado).subscribe(
      res => {
        this.municipios =  res;
      }, err => {
        console.log(err);
      }
    );
  } 
  saveDirs(){
    let temp = this.dirForm.value;
    temp.empresa_id = this.session.getEmpresaId(),
    temp.contacto_id = this.session.getContactoId()
    temp.estado = this.getEstadoById();
    this.saving = true;
    this.direccionesService.save(this.dirForm.value).subscribe(
      res => {
        document.getElementById('reset').click();
        this.session.updateSession();
        this.saving = false;
        this.dirForm.disable();
        this.guardado = true;
        this.existeDirFiscal();
        this.getDirs();
      },
      err => {
        this.error=true;
        console.error(err);
      }
    );
  }
  finalizar(){
    this.router.navigateByUrl('landing');
  }
  getEstadoById(){
    return this.estados.find(e => { return e.id_estado > this.dirForm.value.estado-1; }).nombre_estado;
  }
  addOtro(){
    this.ocultar = false;
    this.guardado = false;
    this.dirForm.enable();
  }
  existeDirFiscal(){
    this.direccionesService.existeDirFiscal(this.session.getEmpresaId()).subscribe(
      res => {
        console.log(res);
        if(this.tipo_sede.length == 3){
          res ? console.log(this.tipo_sede.shift()) : null;
        }
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
  
}
