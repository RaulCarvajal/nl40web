import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-eliminar-colaborador',
  templateUrl: './eliminar-colaborador.component.html',
  styleUrls: ['./eliminar-colaborador.component.css']
})
export class EliminarColaboradorComponent implements OnInit {

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private contactos: ContactoService
  ) { }

  cargando: boolean = false;

  ngOnInit() {
  }

  return(){
    this.location.back();
  }

  eliminar(){
    this.contactos.delColaborador(+this.activatedRoute.snapshot.paramMap.get("id")).subscribe(
      res => {
        this.return();
      },
      err => {
        console.error(err);
      }
    );
  }
}
