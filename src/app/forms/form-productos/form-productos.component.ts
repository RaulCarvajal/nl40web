import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { SessionService } from 'src/app/services/session.service';
import { ProductosService } from 'src/app/services/productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-productos',
  templateUrl: './form-productos.component.html',
  styleUrls: ['./form-productos.component.css']
})
export class FormProductosComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private cats: CatalogosService,
    private session: SessionService,
    private prods: ProductosService,
    private router: Router
  ) { }

  formProducto: FormGroup;
    
  tipos:any[];
  tecnologias:any[];
  niveles:any[];
  poss:any[];
  vd:any[];
  il:any[];

  saving:boolean=false;
  error:boolean=false;
  ocultar: boolean = false;
  propio: boolean = false;
  tercero: boolean = false;
  guardado: boolean = false;

  not_wss = /^\S/;

  ngOnInit() {
    this.formProducto = this.fb.group({
      nombre_producto : [null,[Validators.required, Validators.maxLength(100), Validators.pattern(this.not_wss)]],
      tipo : [null,[Validators.required]],
      descripcion_producto : [null,[Validators.required, Validators.maxLength(500), Validators.pattern(this.not_wss)]],
      tecnologias : [null,[Validators.required]],
      marca : [null,[Validators.maxLength(100), Validators.pattern(this.not_wss)]],
      nivel_partnership : [null,[]],
      posicionamiento : [null,[]],
      value_driver : [null,[Validators.required]],
      industry_lever : [null,[Validators.required]],
      caso_exito : [null,[Validators.required, Validators.pattern(this.not_wss)]],
      referencia : [null,[Validators.required, Validators.pattern(this.not_wss)]] 
    });

    this.getCats();
  }

  getCats(){
    this.cats.getTipoProd().subscribe(
      res => {
        this.tipos = res;
      },
      err => {
        console.error(err);
      }
    );

    this.cats.getTecnologias().subscribe(
      res => {
        this.tecnologias = res;
      },
      err => {
        console.error(err);
      }
    );

    this.cats.getNivelPS().subscribe(
      res => {
        this.niveles = res;
      },
      err => {
        console.error(err);
      }
    );

    this.cats.getPosicionamiento().subscribe(
      res => {
        this.poss = res;
      },
      err => {
        console.error(err);
      }
    );

    this.cats.getValueDrivers().subscribe(
      res => {
        this.vd = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  tipoProd(){
    this.ocultar = true;
    if(this.formProducto.value.tipo!==1){
      this.tercero = true;
      this.propio = false;
    }else{
      this.tercero = false;
      this.propio = true;
    }
  }

  getIL(){
    this.cats.getIndustryLevers(this.formProducto.value.value_driver).subscribe(
      res => {
        this.il = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  save(){
    let temp = this.formProducto.value;
    temp.empresa_id = this.session.getEmpresaId(),
    temp.contacto_id = this.session.getContactoId()
    this.saving = true;
    this.prods.add(temp).subscribe(
      res => {
        this.session.updateSession();
        this.saving = false;
        this.formProducto.disable();
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

  addOtro(){
    document.getElementById('reset').click();
    this.formProducto.enable();
    this.ocultar = false;
    this.propio = false;
    this.tercero = false;
    this.guardado = false;
  }
}
