import { Component, OnInit } from '@angular/core';
import { producto } from '../../interfaces/productos.interface';
import { ProductosService } from '../../services/productos.service';
import { Location } from '@angular/common';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor(
    private session: SessionService,
    private router: Router,
    private location: Location,
    private productosService: ProductosService
  ) { }
  
  cargando:boolean = true;
  tiene_prods: boolean = false;
  productos: producto[];
  pp: producto[];
  pt: producto[];

  ngOnInit() {
    this.getProductos();
  } 

  getProductos(){
    this.productosService.get(this.session.getEmpresaId()).subscribe(
      res => {
        if(res.length>0){
          this.tiene_prods = true;
        }
        this.productos = res;
        this.pp = res.filter( f => f.origen == "Propio" );
        this.pt = res.filter( f => f.origen == "Tercero" );
        this.cargando = false;
      },
      err => {
        console.log(err);
      }
    )
  }

  routerTo(r : string)
  {
    this.router.navigateByUrl(r);
  }
  return(){
    this.location.back();
  }

}
