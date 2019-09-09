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
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConstruccionComponent } from './construccion/construccion.component';


//Providers
import { CatalogosService } from './services/catalogos.service';
import { ContactoService } from './services/contacto.service';
import { SessionService } from './services/session.service';
import { EmpresaService } from './services/empresa.service';
import { NavbarComponent } from './navbar/navbar.component';
import { DireccionesService } from './services/direcciones.service';
import { EstatService } from './services/estat.service';

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
    ConstruccionComponent
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
    NgbProgressbarModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [
    MatDatepickerModule,
    CatalogosService,
    ContactoService,
    SessionService,
    EmpresaService,
    DireccionesService,
    EstatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
