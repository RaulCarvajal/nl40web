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

  saving:boolean=false;
  error:boolean=false;
  ocultar: boolean = false;
  propio: boolean = false;
  tercero: boolean = false;
  guardado: boolean = false;

  ngOnInit() {
    this.formProducto = this.fb.group({
      nombre_producto : [null,[Validators.required]],
      tipo : [null,[Validators.required]],
      descripcion_producto : [null,[Validators.required]],
      tecnologias : [null,[Validators.required]],
      marca : [null,[]],
      nivel_partnership : [null,[]],
      posicionamiento : [null,[]]
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

  save(){
    let temp = this.formProducto.value;
    temp.empresa_id = this.session.getEmpresaId(),
    temp.contacto_id = this.session.getContactoId()
    console.log(temp);
    this.saving = true;
    this.prods.add(temp).subscribe(
      res => {
        console.log(res);
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
