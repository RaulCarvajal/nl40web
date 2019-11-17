import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { producto } from '../../interfaces/productos.interface';
import {Location} from '@angular/common';
import { val_ind } from 'src/app/interfaces/val_ind.interface';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(
    private productos: ProductosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  producto: producto;
  cargando: boolean = true;
  propio: boolean = true;
  tecnologias: string[] = [];
  val_ind: val_ind[] = [];

  ngOnInit() {
    this.productos.getById(+this.activatedRoute.snapshot.paramMap.get("id")).subscribe(
      res => {
        this.producto = res[0];
        this.tecnologias = this.producto.tecnologias.split(',');
        this.propioTercero();
        this.getValInd();
      },err => {
        console.log(err);
      }
    )
  }

  getValInd(){
    this.productos.getValInd(+this.activatedRoute.snapshot.paramMap.get("id")).subscribe(
      res =>{
        this.val_ind = res;
        this.cargando = false;
      },
      err =>{
        console.log(err);
      }
    )
  }

  propioTercero(){
    this.producto.origen == "Propio" ? this.propio = true : this.propio = false;
  }

  return(){
    this.location.back();
  }

}
