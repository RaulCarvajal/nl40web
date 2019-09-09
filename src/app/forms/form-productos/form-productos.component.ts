import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-productos',
  templateUrl: './form-productos.component.html',
  styleUrls: ['./form-productos.component.css']
})
export class FormProductosComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }

  formProducto: FormGroup;

  ngOnInit() {
    this.formProducto = this.fb.group({
      nombre_producto : ['',[Validators.required]],
      tipo : ['',[Validators.required]],
      descripcion_producto : ['',[Validators.required]],
      tecnologias : ['',[Validators.required]],
      marca : ['',[]],
      nivel_partnership : ['',[]],
      posicionamiento : ['',[]],
    })
  }

  save(){
    console.log(this.formProducto.value);
  }

}
