import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(
    private router:Router,
    private fb: FormBuilder,
    private session: SessionService) { }

  ngOnInit() {
    this.loged();
    this.loginForm = this.fb.group({
      usuario : ['', Validators.required],
      contra : ['', Validators.required]
    });
  }

  loginForm: FormGroup;

  routeTo(r:string){
    this.router.navigateByUrl(r);
  }
  loged(){
    if(this.session.isLoged()){
      this.routeTo('inicio');
    }
  }
}
 