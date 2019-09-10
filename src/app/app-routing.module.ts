import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroComponent } from './forms/registro/registro.component';
import { LandingComponent } from './landing/landing.component';
import { InicioComponent } from './inicio/inicio.component';
import { MiempresaComponent } from './miempresa/miempresa.component';
import { ConstruccionComponent } from './construccion/construccion.component';

const routes: Routes = [
  {path : 'registro', component : RegistroComponent},
  {path : 'landing', component : LandingComponent},
  {path : 'inicio', component : InicioComponent},
  {path : 'empresa', component : MiempresaComponent},
  {path : 'productos', component : ConstruccionComponent},
  {path : 'estatificacion', component : ConstruccionComponent},
  {path : 'colaboradores', component : ConstruccionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
