import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private session:SessionService,
    private router:Router
  ) { }
  
  nombre: string = " ";
  tipo_user: string = " ";
  admin: boolean = true;
  
  ngOnInit() {
    this.getStrings();
    this.isAdmin();
  }


  getStrings(){
    this.nombre = this.session.getContactoName();
    this.tipo_user = this.session.getTipoUsuario();
  }

  closeSession(){
    this.session.closeSession();
    this.router.navigateByUrl('landing');
  }

  isAdmin(){
    if(this.session.getTipoUsuario() == "colaborador"){
      this.admin = false;
    }
  }
}
