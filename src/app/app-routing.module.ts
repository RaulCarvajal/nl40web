import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroComponent } from './forms/registro/registro.component';
import { LandingComponent } from './landing/landing.component';
import { InicioComponent } from './inicio/inicio.component';
import { MiempresaComponent } from './ver/miempresa/miempresa.component';
import { ConstruccionComponent } from './construccion/construccion.component';
import { ProductoComponent } from './ver/producto/producto.component';
import { EditarEmpresaComponent } from './editar/editar-empresa/editar-empresa.component';
import { EditarDireccionComponent } from './editar/editar-direccion/editar-direccion.component';
import { EliminarDireccionComponent } from './eliminar/eliminar-direccion/eliminar-direccion.component';




const routes: Routes = [
  {path : 'registro', component : RegistroComponent},
  {path : 'landing', component : LandingComponent},
  {path : 'inicio', component : InicioComponent},
  {path : 'empresa', component : MiempresaComponent},
  {path : 'producto/:id', component : ProductoComponent},
  {path : 'productos', component : ConstruccionComponent},
  {path : 'estatificacion', component : ConstruccionComponent},
  {path : 'colaboradores', component : ConstruccionComponent},
  {path : 'editar/direcciones/:id', component : EditarDireccionComponent},
  {path : 'editar/empresa', component : EditarEmpresaComponent},
  {path : 'eliminar/empresa', component : EditarEmpresaComponent},
  {path : 'eliminar/direccion/:id', component : EliminarDireccionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
