import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SessionService } from 'src/app/services/session.service';
import { ProductosService } from 'src/app/services/productos.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { producto_tabla, producto_tecnologias } from 'src/app/interfaces/productos.interface';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  constructor(
    private session: SessionService,
    private router: Router,
    private location: Location,
    private prods: ProductosService,
    private fb: FormBuilder,
    private cats: CatalogosService,
    private activatedRoute: ActivatedRoute
  ) { 
  }

  tipos:any[];
  tecnologias:any[];
  niveles:any[];
  poss:any[];
  vd:any[];
  il:any[] = new Array(4);

  cargando:boolean = true;
  saving:boolean=false;
  error:boolean=false;
  ocultar: boolean = false;
  propio: boolean = false;
  tercero: boolean = false;
  guardado: boolean = false;
  sc: boolean = true;
  not_wss = /^\S/;

  formProducto: FormGroup;

  producto : producto_tabla = null;
  tec_prod : producto_tecnologias[] = null;
  tecs: number[] = [];
  marca :  string = "";
  id_marca :  string = "";

  ngOnInit() {
    this.getCats();
    this.getProductoTable();
  }
  initForm(){
    this.formProducto = this.fb.group({
      nombre_producto : [this.producto.nombre,[Validators.required, Validators.maxLength(100), Validators.pattern(this.not_wss)]],
      tipo : [this.producto.fk_id_origen,[Validators.required]],
      descripcion_producto : [this.producto.descripcion,[Validators.required, Validators.maxLength(500), Validators.pattern(this.not_wss)]],
      tecnologias : [this.tecs ,[Validators.required]],
      marca : [this.marca,[Validators.maxLength(100), Validators.pattern(this.not_wss)]],
      nivel_partnership : [this.producto.partnership,[]],
      posicionamiento : [this.producto.fk_id_posicionamiento,[]],
      val_ind : this.fb.array([
        this.fb.group({
          value_driver : [null,[Validators.required]],
          industry_lever : [null,[Validators.required]]
        })
      ]),
      caso_exito : [this.producto.caso_exito,[Validators.required, Validators.pattern(this.not_wss)]],
      referencia : [this.producto.referencia,[Validators.required, Validators.pattern(this.not_wss)]],
      fk_id_marca_nivelp :[this.producto.fk_id_marca_nivelp],
      fk_id_posicionamiento : [this.producto.fk_id_posicionamiento],
      id_producto : [this.producto.id_producto]
    });
    
    this.getIndVal();
    this.cargando = false;
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
    this.prods.update(temp).subscribe(
      res => {
        console.log(res);
        this.saving = false;
      },
      err => console.log(err)
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
      }
    );
  }
  getIL2(vd: number, pid: number){
    this.cats.getIndustryLevers(vd).subscribe(
      res => {
        this.il[pid] = res;
      },
      err => {
      }
    );
  }
  return(){
    this.location.back();
  }
  getProductoTable(){
    this.prods.getProductoTabla(+this.activatedRoute.snapshot.paramMap.get("id")).subscribe(
      res => {
        this.producto = res;
        this.getTecnologias(this.producto.id_producto);
        this.ocultar = true;
        if(this.producto.fk_id_origen == 1){
          this.propio = true;
        }else{
          this.getMarca(this.producto.fk_id_marca_nivelp);
          this.tercero = true;
        }
        setTimeout(() => {
          this.initForm()
        }, 1000);
      },
      err => {
        console.error(err);
      }
    );
  }
  getTecnologias(id : number){
    this.prods.getTecnologiaProducto(id).subscribe(
      res => {
        res.forEach(e => {
          this.tecs.push(e.fk_id_tecnologia);
        });
      },
      err => {
        console.error(err);
      }
    );
  }
  getMarca(id : number){
    this.prods.getMarca(id).subscribe(
      res => {
        this.marca = res.marca;
      },
      err => {
        console.error(err);
      }
    );
  }
  getIndVal(){
    this.prods.getValIndTable(+this.activatedRoute.snapshot.paramMap.get("id")).subscribe(
      res => {
        let temp = [
          { value_driver : res[0].id_val, industry_lever : res[0].industry_levers.split(", ")}
        ];
        this.getIL2(res[0].id_val,0);
        for(let i = 1; i < res.length; i++){
          if(!(res[i]==null)){
            temp.push({ value_driver : res[i].id_val, industry_lever : res[i].industry_levers.split(", ")});
            this.addIndVal();
            this.getIL2(res[i].id_val,i);
          }
        }
        this.formProducto.patchValue({val_ind : temp});
      },
      err => console.error(err)
    );
  }
}
