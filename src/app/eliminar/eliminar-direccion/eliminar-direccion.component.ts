import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DireccionesService } from 'src/app/services/direcciones.service';

@Component({
  selector: 'app-eliminar-direccion',
  templateUrl: './eliminar-direccion.component.html',
  styleUrls: ['./eliminar-direccion.component.css']
})
export class EliminarDireccionComponent implements OnInit {

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private direcciones: DireccionesService
  ) { }

  ngOnInit() {
  }

  cargando: boolean = false;

  return(){
    this.location.back();
  }

  //+this.activatedRoute.snapshot.paramMap.get("id");
  eliminar(){
    this.direcciones.delete(+this.activatedRoute.snapshot.paramMap.get("id")).subscribe(
      res => {
        console.log(res);
        this.return();
      },
      err => {
        console.error(err);
      }
    );
  }

}
