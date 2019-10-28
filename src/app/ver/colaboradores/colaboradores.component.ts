import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ContactoService } from 'src/app/services/contacto.service';
import { SessionService } from 'src/app/services/session.service';
import { contacto } from 'src/app/interfaces/contacto.interface';

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.css']
})
export class ColaboradoresComponent implements OnInit {

  constructor(
    private router: Router,
    private location: Location,
    private colaboradoresService: ContactoService,
    private session:SessionService
  ) { }

  ngOnInit() {
    this.getColaboradores();
  }

  cargando: boolean = true;
  colaboradores: contacto[];
  sin_colab: boolean = false;

  getColaboradores(){
    this.colaboradoresService.getColaboradores(this.session.getEmpresaId()).subscribe(
      res => {
        if(res.length == 0){
          this.sin_colab = true;
        }
        this.colaboradores = res;
        this.cargando = false;
      },
      err => {
        console.log(err);
      }
    );
  }
  routerTo(r : string)
  {
    this.router.navigateByUrl(r);
  }
  return(){
    this.location.back();
  }

}
