import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { DISABLED } from '@angular/forms/src/model';
import { estado } from 'src/app/interfaces/estados.interface';
import { municipio } from 'src/app/interfaces/municipios.interface';
import { SessionService } from 'src/app/services/session.service';
import { DireccionesService } from 'src/app/services/direcciones.service';
import { Router } from '@angular/router';

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
    private router: Router) { }

  ngOnInit() {
    this.dirForm = this.fb.group({
      direcciones : this.fb.array([this.fb.group({
        direccion : ['',[Validators.required]],
        tipo_sede : ['',[Validators.required]],
        pais : ['México',[Validators.required]],
        estado : ['',[Validators.required]],
        municipio : ['',[Validators.required]],
      })]),
      empresa_id : this.session.getEmpresaId(),
      contacto_id : this.session.getContactoId()
    });
    this.getTipoSede();
    this.getEstados();
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

  get getDirecciones(){ 
    return this.dirForm.get('direcciones') as FormArray;
  }

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
  getEstados(){
    this.catalogos.getEstadosMex().subscribe(
      res => {
        this.estados =  res;
      }, err => {
        console.error(err);
      }
    );
  }

  /**getMunicipio(){
    this.catalogos.getMunicipiosMex(this).subscribe(
      res => {
        this.estados =  res;
      }, err => {
        console.log(err);
      }
    );
  } */

  addDir(){
    const control = <FormArray> this.dirForm.controls['direcciones']
    control.push(this.fb.group({
      direccion : ['',[Validators.required]],
      tipo_sede : ['',[Validators.required]],
      pais : ['México',[Validators.required]],
      estado : ['',[Validators.required]],
      municipio : ['',[Validators.required]],
    }));
  }

  remDirForm(index:number){
    const control = <FormArray> this.dirForm.controls['direcciones']
    control.removeAt(index);
  }

  saveDirs(){
    this.saving = true;
    this.direccionesService.save(this.dirForm.value).subscribe(
      res => {
        this.router.navigateByUrl('landing');
        console.log(res);
        this.session.updateSession();
        this.saving = false;
      },
      err => {
        this.error=true;
        console.error(err);
      }
    );
  }

}
