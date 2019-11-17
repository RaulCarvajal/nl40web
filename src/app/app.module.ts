import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './forms/registro/registro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LandingComponent } from './landing/landing.component';
import { MatSelectModule } from '@angular/material/select';
import { InicioComponent } from './inicio/inicio.component';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { FormEmpresaComponent } from './forms/form-empresa/form-empresa.component';
import { FormDireccionesComponent } from './forms/form-direcciones/form-direcciones.component';
import { FormEstatificacionComponent } from './forms/form-estatificacion/form-estatificacion.component';
import { FormProductosComponent } from './forms/form-productos/form-productos.component';
//import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConstruccionComponent } from './construccion/construccion.component';
import { CatalogosService } from './services/catalogos.service';
import { ContactoService } from './services/contacto.service';
import { SessionService } from './services/session.service';
import { EmpresaService } from './services/empresa.service';
import { NavbarComponent } from './navbar/navbar.component';
import { DireccionesService } from './services/direcciones.service';
import { EstatService } from './services/estat.service';
import { ProductosService } from './services/productos.service';
import { MiempresaComponent } from './ver/miempresa/miempresa.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { ProductoComponent } from './ver/producto/producto.component';
import { CorreosService } from './services/correos.service'; 
import { FooterComponent } from './footer/footer.component';
import { EditarEmpresaComponent } from './editar/editar-empresa/editar-empresa.component';
import { EditarDireccionComponent } from './editar/editar-direccion/editar-direccion.component';
import { EditarEstatificacionComponent } from './editar/editar-estatificacion/editar-estatificacion.component';
import { EliminarDireccionComponent } from './eliminar/eliminar-direccion/eliminar-direccion.component';
import { EstratificacionComponent } from './ver/estratificacion/estratificacion.component';
import { ColaboradoresComponent } from './ver/colaboradores/colaboradores.component';
import { AgregarDireccionComponent } from './agregar/agregar-direccion/agregar-direccion.component';
import { MAT_DATE_LOCALE } from '@angular/material';
import { AgregarColaboradorComponent } from './agregar/agregar-colaborador/agregar-colaborador.component';
import { EliminarColaboradorComponent } from './eliminar/eliminar-colaborador/eliminar-colaborador.component';
import { EditarColaboradorComponent } from './editar/editar-colaborador/editar-colaborador.component';
import { MicuentaComponent } from './micuenta/micuenta.component';
import { EditarMicuentaComponent } from './editar/editar-micuenta/editar-micuenta.component';
import { ProductosComponent } from './ver/productos/productos.component';
import { EditarProductoComponent } from './editar/editar-producto/editar-producto.component';
import { EliminarProductoComponent } from './eliminar/eliminar-producto/eliminar-producto.component';
import { AgregarProductoComponent } from './agregar/agregar-producto/agregar-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    LandingComponent,
    InicioComponent,
    FormEmpresaComponent,
    FormDireccionesComponent,
    FormEstatificacionComponent,
    FormProductosComponent,
    NavbarComponent,
    ConstruccionComponent,
    MiempresaComponent,
    ProductoComponent,
    FooterComponent,
    EditarEmpresaComponent,
    EditarDireccionComponent,
    EliminarDireccionComponent,
    EditarEstatificacionComponent,
    EstratificacionComponent,
    ColaboradoresComponent,
    AgregarDireccionComponent,
    AgregarColaboradorComponent,
    EliminarColaboradorComponent,
    EditarColaboradorComponent,
    MicuentaComponent,
    EditarMicuentaComponent,
    ProductosComponent,
    EditarProductoComponent,
    EliminarProductoComponent,
    AgregarProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    //NgbProgressbarModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    TabsModule.forRoot(),
    NgbModule,
    MatTableModule
  ],
  providers: [
    MatDatepickerModule,
    CatalogosService,
    ContactoService,
    SessionService,
    EmpresaService,
    DireccionesService,
    EstatService,
    ProductosService,
    CorreosService,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
