import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { contacto } from '../interfaces/contacto.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private session: SessionService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      usr : ['', Validators.required],
      psw : ['', Validators.required]
    });
  }

  loginForm: FormGroup;
  faillog: boolean = false;
  log: boolean = false;

  login(){
    this.log = true;
    this.session.login(this.loginForm.value).subscribe(
      res => {
        let temp: contacto = res;
        if(temp.nombre_usuario.startsWith("NULL")){
          console.error(temp.nombre_usuario);
          this.faillog = true;
        }else{
          this.faillog = false;
          this.session.saveSession(temp);
          this.hideModal();
          this.router.navigateByUrl('inicio');
        }
        this.log = false;
      },
      err => {
        console.error(err);
      }
    );
    //this.hideModal();
    //this.router.navigateByUrl('inicio');
  }

  clear(){
    this.faillog = false;
  }

  hideModal():void {
    document.getElementById('close-modal').click();
  }

}
