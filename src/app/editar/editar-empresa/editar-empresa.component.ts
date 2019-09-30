import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';
import { sectora } from 'src/app/interfaces/sectoresa.interface';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { Location } from '@angular/common';
import { EmpresaService } from 'src/app/services/empresa.service';
import { empresa_table } from 'src/app/interfaces/empresa_get.interface';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.css']
})
export class EditarEmpresaComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private session: SessionService,
    private catalogosService: CatalogosService,
    private location: Location,
    private empresas: EmpresaService
  ) {
      this.getEmpresa(); 
   }

  ngOnInit() {
    this.getSectoresA();
  }

  empresaForm: FormGroup;
  sectoresA:sectora[];
  cargando: boolean = true;
  empresa: empresa_table;
  sect: string;

  initForm(){
    this.sect = this.empresa.sectores_atendidos.slice(1,this.empresa.sectores_atendidos.length);
    this.empresaForm =  this.fb.group({
      nombre : [this.empresa.nombre,[Validators.maxLength(150)]],
      razon_social : [this.empresa.razon_social,[Validators.maxLength(150)]],
      rfc : [this.empresa.rfc,[Validators.minLength(12),Validators.maxLength(13)]],
      fecha_creación : [this.empresa.fecha_creación.slice(0,10),[Validators.required]],
      web : [this.empresa.web,[Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/),Validators.maxLength(200)]],
      linkedin : [this.empresa.linkedin,[Validators.maxLength(100), Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
      facebook : [this.empresa.facebook,[Validators.maxLength(100), Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
      twitter : [this.empresa.twitter,[Validators.maxLength(100), Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
      instagram : [this.empresa.instagram,[Validators.maxLength(100), Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
      descripcion_oferta_valor : [this.empresa.descripcion_oferta_valor,[Validators.maxLength(500)]],
      sectores_atendidos : [[],[]],
      clientes_sectores : [this.empresa.principales_clientes,[]],
      id_empresa : [this.session.getEmpresaId()]
    });
    this.cargando = false;
  }

  getSectoresA(){
    this.catalogosService.getSectoresAntendidos().subscribe(
      res => {
        this.sectoresA =  res;
      }, err => {
        console.log(err);
      }
    );
  }
  getEmpresa(){
    this.empresas.getEmpresaTable(this.session.getEmpresaId()).subscribe(
      res => {
        this.empresa = res;
        this.initForm();
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
    this.cargando = true;
    this.empresas.update(this.empresaForm.value).subscribe(
      res => {
        this.cargando = false;
      },
      err => {
        console.error(err);
      }
    );
  }



}
