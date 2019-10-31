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
import { EditarEstatificacionComponent } from './editar/editar-estatificacion/editar-estatificacion.component';
import { EliminarDireccionComponent } from './eliminar/eliminar-direccion/eliminar-direccion.component';
import { EstratificacionComponent } from './ver/estratificacion/estratificacion.component';
import { ColaboradoresComponent } from './ver/colaboradores/colaboradores.component';
import { AgregarDireccionComponent } from './agregar/agregar-direccion/agregar-direccion.component';
import { AgregarColaboradorComponent } from './agregar/agregar-colaborador/agregar-colaborador.component';
import { EliminarColaboradorComponent } from './eliminar/eliminar-colaborador/eliminar-colaborador.component';
import { EditarColaboradorComponent } from './editar/editar-colaborador/editar-colaborador.component';
import { MicuentaComponent } from './micuenta/micuenta.component';
import { EditarMicuentaComponent } from './editar/editar-micuenta/editar-micuenta.component';

const routes: Routes = [
  {path : 'registro', component : RegistroComponent},
  {path : 'landing', component : LandingComponent},
  {path : 'inicio', component : InicioComponent},
  {path : 'empresa', component : MiempresaComponent},
  {path : 'micuenta', component : MicuentaComponent},
  {path : 'producto/:id', component : ProductoComponent},
  {path : 'productos', component : ConstruccionComponent},
  {path : 'estratificacion', component : EstratificacionComponent},
  {path : 'colaboradores', component : ColaboradoresComponent},
  {path : 'editar/direcciones/:id', component : EditarDireccionComponent},
  {path : 'editar/empresa', component : EditarEmpresaComponent},
  {path : 'editar/estratificacion', component : EditarEstatificacionComponent},
  {path : 'editar/colaborador/:id', component : EditarColaboradorComponent},
  {path : 'editar/micuenta', component : EditarMicuentaComponent},
  {path : 'eliminar/empresa', component : EditarEmpresaComponent},
  {path : 'eliminar/direccion/:id', component : EliminarDireccionComponent},
  {path : 'eliminar/colaborador/:id', component : EliminarColaboradorComponent},
  {path : 'agregar/direccion', component : AgregarDireccionComponent},
  {path : 'agregar/colaborador', component : AgregarColaboradorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
