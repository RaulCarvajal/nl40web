import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
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
  il:any[] = new Array(4);
  productos: any[];

  saving:boolean=false;
  error:boolean=false;
  ocultar: boolean = false;
  propio: boolean = false;
  tercero: boolean = false;
  guardado: boolean = false;
  sc: boolean = true;
  tiene_prods:boolean = false;
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
      val_ind : this.fb.array([
        this.fb.group({
          value_driver : [null,[Validators.required]],
          industry_lever : [null,[Validators.required]]
        })
      ]),
      /*value_driver : [null,[Validators.required]],
      industry_lever : [null,[Validators.required]],*/
      caso_exito : [null,[Validators.required, Validators.pattern(this.not_wss)]],
      referencia : [null,[Validators.required, Validators.pattern(this.not_wss)]] 
    });


    this.getCats();
    this.getProdBasicos();
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
        /*for (let index = 0; index < 5; index++) {
          this.vd.push(res);
        }*/
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

  getIL(pid: number, index: number){
    this.cats.getIndustryLevers(this.formProducto.value.val_ind[index].value_driver).subscribe(
      res => {
        this.il[pid] = res;
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
    //temp.industry_lever = temp.industry_lever.join(', ');
    this.saving = true;
    this.prods.add(temp).subscribe(
      res => {
        this.session.updateSession();
        this.saving = false;
        this.formProducto.disable();
        this.guardado = true;
        document.getElementById('reset').click();
        this.getProdBasicos();
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

  get getValInd(){
    return this.formProducto.get('val_ind') as FormArray;
  }

  addIndVal(){
    const cntrs = <FormArray>this.formProducto.controls['val_ind'];
    cntrs.push(this.fb.group({
      value_driver : [null,[Validators.required]],
      industry_lever : [null,[Validators.required]]
    }));
    if((<FormArray>this.formProducto.controls['val_ind']).length>4){
      this.sc = false;      
    }
  }

  delIndVal(pind: number){
    const cntrs = <FormArray>this.formProducto.controls['val_ind'];
    cntrs.removeAt(pind); 
    if(cntrs.length<5){
      this.sc = true;
    }
  }

  getProdBasicos(){
    this.prods.getBasico(this.session.getEmpresaId()).subscribe(
      res =>{
        if(res.length>0){
          this.productos = res
          this.tiene_prods = true;
        }else{
          this.tiene_prods = false;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  saltarProductos(){
    this.saving = true;
    this.prods.saltarProductos(this.session.getContactoId()).subscribe(
      res => {
        this.session.updateSession();
        this.saving = false;
        this.router.navigateByUrl('landing');
      },
      err => {
        console.log(err);
      }
    );
  }
}
