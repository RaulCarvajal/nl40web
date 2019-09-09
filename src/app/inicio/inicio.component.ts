import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
    private router: Router,
    private session: SessionService
  ) { }

  ngOnInit() {
    this.loged();
  }

  private regstat = this.session.getRegStatus();

  get progressNum(){
    switch (this.regstat) {
      case 3:
        return 40;
      case 4:
        return 60;
      case 5:
        return 80;
      case 6:
        return 100;
      default:
        return 20;
    }
  }

  routeTo(r:string){
    this.router.navigateByUrl(r);
  }
  loged(){
    if(this.session.isLoged()){
      this.routeTo('inicio');
    }
  }
}
