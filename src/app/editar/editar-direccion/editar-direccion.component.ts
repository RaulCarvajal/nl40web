import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SessionService } from 'src/app/services/session.service';
import { direccion_get } from 'src/app/interfaces/direcciones_get.interface';
import { DireccionesService } from 'src/app/services/direcciones.service';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { estado } from 'src/app/interfaces/estados.interface';
import { municipio } from 'src/app/interfaces/municipios.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-editar-direccion',
  templateUrl: './editar-direccion.component.html',
  styleUrls: ['./editar-direccion.component.css']
})
export class EditarDireccionComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private direccionesService: DireccionesService,
    private session: SessionService,
    private catalogos: CatalogosService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) { 
    this.getEstados();
    this.getTipoSede();
  }

  ngOnInit() {
  }

  dirForm: FormGroup;
  direccion:direccion_get;
  tipo_sede: any[];
  paises:any[] = [
    { 'nombre' : 'México'}
  ];
  estados: estado[];
  municipios: municipio[];
  cargando: boolean = true;
  id_estado: number = 0; 
  id_tiposede:number = 0;
  
  getTipoSede(){
    this.catalogos.getTipoSede().subscribe(
      res => {
        this.tipo_sede = res;
      },
      err => {
        console.error(err)
      }
    );
  }
  getDirs(){
    this.direccionesService.get(this.session.getEmpresaId()).subscribe(
      res => {
        let id = +this.activatedRoute.snapshot.paramMap.get("id");
        this.direccion = res.find(e => { return e.id === id; });
        this.id_estado = this.estados.find(e => { return e.nombre_estado == this.direccion.estado}).id_estado;
        this.id_tiposede = this.tipo_sede.find(e => { return e.tipo_sede == this.direccion.tipo_sede}).id_cat_sede;
        this.initForm();
      },
      err => {
        console.error(err);
      }
    );
  }
  getEstados(){
    this.catalogos.getEstadosMex().subscribe(
      res => {
        this.estados =  res;
        this.getDirs();
      }, err => {
        console.error(err);
      }
    );
  }
  getMunicipio(){
    this.catalogos.getMunicipiosMex(this.dirForm.value.estado).subscribe(
      res => {
        this.municipios =  res;
        this.dirForm.controls.municipio.setValue(this.direccion.municipio);
        this.cargando = false;
      }, err => {
        console.log(err);
      }
    );
  }
  existeDirFiscal(){
    this.direccionesService.existeDirFiscal(this.session.getEmpresaId()).subscribe(
      res => {
        res? this.tipo_sede.shift():null;
      },
      err => { 
        console.error(err);
      }
    );
  }
  return(){
    this.location.back();
  }
  update(){
    let temp = this.dirForm.value
    temp.estado = this.getEstadoById();
    this.direccionesService.update(temp).subscribe(
      res => {
        this.return();
      },
      err => {
        console.error(err);
      }
    );
  }
  getEstadoById(){
    return this.estados.find(e => { return e.id_estado > this.dirForm.value.estado-1; }).nombre_estado;
  }
  initForm(){
    this.dirForm = this.fb.group({
      direccion : [this.direccion.direccion,[Validators.required, Validators.maxLength(150)]],
      tipo_sede : [this.id_tiposede,[Validators.required]],
      pais : ['México',[Validators.required]],
      estado : [this.id_estado,[Validators.required]],
      municipio : ['',[Validators.required]],
      id_emp_dir : [+this.activatedRoute.snapshot.paramMap.get("id"),[]]
    });
    this.getMunicipio();
  }
}
