import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { sectora } from 'src/app/interfaces/sectoresa.interface';
import { organizacion } from 'src/app/interfaces/organizaciones.interface';
import { estado } from 'src/app/interfaces/estados.interface';
import { pais } from 'src/app/interfaces/paises.interface';
import { SessionService } from 'src/app/services/session.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-empresa',
  templateUrl: './form-empresa.component.html',
  styleUrls: ['./form-empresa.component.css']
})
export class FormEmpresaComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private catalogosService: CatalogosService,
    private session: SessionService,
    private empresa: EmpresaService,
    private router: Router) { }

  ngOnInit() {
    this.empresaForm =  this.fb.group({
      nombre : ['',[Validators.required,Validators.maxLength(150),Validators.pattern(this.not_wss)]],
      razon_social : ['',[Validators.required,Validators.maxLength(150),Validators.pattern(this.not_wss)]],
      rfc : ['',[Validators.required,Validators.minLength(12),Validators.maxLength(13),Validators.pattern(/^([A-Z,Ñ,&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\d]{3})$/)]],
      fecha_creación : ['',[Validators.required]],
      web : ['',[Validators.pattern(this.url_regex),Validators.maxLength(200)]],
      linkedin : ['',[Validators.maxLength(100), Validators.pattern(this.url_regex)]],
      facebook : ['',[Validators.maxLength(100), Validators.pattern(this.url_regex)]],
      twitter : ['',[Validators.maxLength(100), Validators.pattern(this.url_regex)]],
      instagram : ['',[Validators.maxLength(100), Validators.pattern(this.url_regex)]],
      descripcion_oferta_valor : ['',[Validators.required,Validators.maxLength(500)]],
      sectores_atendidos : ['',[Validators.required]],
      clientes_sectores : ['',[Validators.required]],
      orgs_afiliado : ['',[]],
      c_nacional : ['',[Validators.required]],
      c_internacional : ['',[Validators.required]],
      fk_id_contacto : [this.session.getContactoId()]
    });

    this.getSectoresA();
    this.getOrgEmp();
    this.getEstados();
    this.getPaises();
  }

  empresaForm: FormGroup;
  sectoresA:sectora[];
  organizacionesEmp:organizacion[];
  estados:estado[];
  paises:pais[];
  saving:boolean=false;
  error:boolean=false;
  guardado: boolean = false;
  url_regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

  //url_regex = /^([a-z][a-z0-9\*\-\.]*):\/\/(?:(?:(?:[\w\.\-\+!$&'\(\)*\+,;=]|%[0-9a-f]{2})+:)*(?:[\w\.\-\+%!$&'\(\)*\+,;=]|%[0-9a-f]{2})+@)?(?:(?:[a-z0-9\-\.]|%[0-9a-f]{2})+|(?:\[(?:[0-9a-f]{0,4}:)*(?:[0-9a-f]{0,4})\]))(?::[0-9]+)?(?:[\/|\?](?:[\w#!:\.\?\+=&@!$'~*,;\/\(\)\[\]\-]|%[0-9a-f]{2})*)?$/;
  not_wss = /^\S/;

  getSectoresA(){
    this.catalogosService.getSectoresAntendidos().subscribe(
      res => {
        this.sectoresA =  res;
      }, err => {
        console.log(err);
      }
    );
  }
  getOrgEmp(){
    this.catalogosService.getOrgEmpresariales().subscribe(
      res => {
        this.organizacionesEmp =  res;
      }, err => {
        console.log(err);
      }
    );
  }
  getEstados(){
    this.catalogosService.getEstadosMex().subscribe(
      res => {
        this.estados =  res;
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


  saveEmpresa(){
    this.saving = true;
    console.log(this.empresaForm.value);
    this.empresa.add(this.empresaForm.value).subscribe(
      res => {
        this.session.updateSession();
        localStorage.setItem('idempresa' , res.id);
        this.saving = false;
        this.empresaForm.disable();
        this.guardado = true;
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

}