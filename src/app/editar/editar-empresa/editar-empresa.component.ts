import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';
import { sectora } from 'src/app/interfaces/sectoresa.interface';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { Location } from '@angular/common';
import { EmpresaService } from 'src/app/services/empresa.service';
import { empresa_table } from 'src/app/interfaces/empresa_get.interface';
import { estado } from 'src/app/interfaces/estados.interface';
import { pais } from 'src/app/interfaces/paises.interface';
import { Select2OptionData } from 'ng-select2';

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
    this.getSectores();
    this.getOrgs();
    this.getEstados();
    this.getPaises();
  }

  empresaForm: FormGroup;
  cargando: boolean = true;
  empresa: empresa_table;
  sectoresA: sectora [];
  sect: string[] = [];
  org_emp: number[] = [];
  organizacionesEmp: any[] = [];
  estados:estado[];
  paises:pais[];
  esta: string[] = [];
  pais: string[] = [];

  url_regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  not_wss = /^\S/;

  public estas2: Array<Select2OptionData>;

  initForm(){
    this.empresaForm =  this.fb.group({
      nombre : [this.empresa.nombre,[Validators.maxLength(150),Validators.pattern(this.not_wss)]],
      razon_social : [this.empresa.razon_social,[Validators.maxLength(150),Validators.pattern(this.not_wss)]],
      rfc : [this.empresa.rfc,[Validators.minLength(12),Validators.maxLength(13),Validators.pattern(/^([A-Z,Ñ,&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\d]{3})$/)]],
      fecha_creación : [this.empresa.fecha_creación.slice(0,10),[Validators.required]],
      web : [this.empresa.web,[Validators.pattern(this.url_regex),Validators.maxLength(200)]],
      linkedin : [this.empresa.linkedin,[Validators.maxLength(100), Validators.pattern(this.url_regex)]],
      facebook : [this.empresa.facebook,[Validators.maxLength(100), Validators.pattern(this.url_regex)]],
      twitter : [this.empresa.twitter,[Validators.maxLength(100), Validators.pattern(this.url_regex)]],
      instagram : [this.empresa.instagram,[Validators.maxLength(100), Validators.pattern(this.url_regex)]],
      descripcion_oferta_valor : [this.empresa.descripcion_oferta_valor,[Validators.maxLength(500),Validators.pattern(this.not_wss)]],
      sectores_atendidos : [this.sect,[]],
      clientes_sectores : [this.empresa.principales_clientes,[]],
      orgs_afiliado : [this.org_emp,[]],
      c_nacional : [this.esta,[]],
      c_internacional : [this.pais,[]],
      id_empresa : [this.session.getEmpresaId()],
      id_cobertura : [this.empresa.cobertura.id_cobertura]
    });
    this.cargando = false;
  }

  getSectoresArray(){
      this.sect = this.empresa.sectores_atendidos.slice(1,this.empresa.sectores_atendidos.length).split(',');
  }
  getPaisesArray(){
    this.pais = this.empresa.cobertura.internacional.slice(1,this.empresa.sectores_atendidos.length).split(',');
  }
  getEstadosArray(){
    this.esta = this.empresa.cobertura.nacional.slice(1,this.empresa.sectores_atendidos.length).split(',');
  }
  getOrgEmpArray(){
    this.empresa.orgs_emp.forEach( e => {
      this.org_emp.push(e.fk_id_org);
    });
  }
  getSectores(){
    this.catalogosService.getSectoresAntendidos().subscribe(
      res => {
        this.sectoresA = res;
      },
      err => {
        console.log(err);
      }
    );
  }
  getOrgs(){
    this.catalogosService.getOrgEmpresariales().subscribe(
      res => {
        this.organizacionesEmp = res;
      },
      err => {
        console.log(err);
      }
    );
  }
  getEstados(){
    this.catalogosService.getEstadosMex().subscribe(
      res => {
        this.estados =  res;
        this.getEstadS2();
      }, err => {
        console.log(err);
      }
    );
  }
  getPaises(){
    this.catalogosService.getPaises().subscribe(
      res => {
        this.paises =  res;
      }, err => {
        console.log(err);
      }
    );
  }
  getEmpresa(){
    this.empresas.getEmpresaTable(this.session.getEmpresaId()).subscribe(
      res => {
        this.empresa = res;
        console.log(res);
        this.getSectoresArray();
        this.getPaisesArray();
        this.getEstadosArray();
        this.getOrgEmpArray();
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

  getEstadS2(){
    this.estados.forEach( e => {
      this.estas2.push({id: e.nombre_estado, text: e.nombre_estado});
    })
  }
}
