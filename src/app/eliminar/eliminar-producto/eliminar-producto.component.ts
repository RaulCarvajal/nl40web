import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.css']
})
export class EliminarProductoComponent implements OnInit {

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private producto: ProductosService
  ) { }

  ngOnInit() {
  }

  cargando: boolean = false;

  return(){
    this.location.back();
  }

  //+this.activatedRoute.snapshot.paramMap.get("id");
  eliminar(){
    this.producto.delete(+this.activatedRoute.snapshot.paramMap.get("id")).subscribe(
      res => {
        this.return();
      },
      err => {
        console.error(err);
      }
    );
  }

}

