import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { Location } from '@angular/common';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { CatalogosService } from 'src/app/services/catalogos.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

  constructor(
    private session: SessionService,
    private router: Router,
    private location: Location,
    private prods: ProductosService,
    private fb: FormBuilder,
    private cats: CatalogosService
  ) { }

  tipos:any[];
  tecnologias:any[];
  niveles:any[];
  poss:any[];
  vd:any[];
  il:any[] = new Array(4);
  productos: any[];

  cargando:boolean = false;
  saving:boolean=false;
  error:boolean=false;
  ocultar: boolean = false;
  propio: boolean = false;
  tercero: boolean = false;
  guardado: boolean = false;
  sc: boolean = true;
  tiene_prods:boolean = false;
  not_wss = /^\S/;

  formProducto: FormGroup;

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
        this.return();
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

  routerTo(r : string)
  {
    this.router.navigateByUrl(r);
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

  return(){
    this.location.back();
  }

}
