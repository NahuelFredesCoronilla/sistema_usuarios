import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
//Angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


//componentes

import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/Auth.service';
import { InterceptorService } from './services/interceptor.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditComponent } from './components/edit/edit.component';
import { MaquinariaCrudComponent } from './components/maquinaria-crud/maquinaria-crud.component';
import { CrearComponent } from './components/maquinaria-crud/crear/crear.component';
import { EditMaquinariaComponent } from './components/maquinaria-crud/edit-maquinaria/edit-maquinaria.component';
import { AlquilarMaquinariaComponent } from './components/maquinaria-crud/alquilar-maquinaria/alquilar-maquinaria.component';
import { MisAlquileresComponent } from './components/mis-alquileres/mis-alquileres.component';
import { DetallesMiAlquilerComponent } from './components/mis-alquileres/detalles-mi-alquiler/detalles-mi-alquiler.component';
import {MatCardModule} from '@angular/material/card';
import { ListaAlquileresComponent } from './components/lista-alquileres/lista-alquileres.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgChartsModule } from 'ng2-charts';
import { GraficoDuracionComponent } from './components/lista-alquileres/grafico-duracion/grafico-duracion.component';








@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    DashboardComponent,
    EditComponent,
    MaquinariaCrudComponent,
    CrearComponent,
    EditMaquinariaComponent,
    AlquilarMaquinariaComponent,
    MisAlquileresComponent,
    DetallesMiAlquilerComponent,
    ListaAlquileresComponent,
    GraficoDuracionComponent
    
    
   
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
   
    HttpClientModule,
    FormsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatPaginatorModule,
    NgxChartsModule,
    NgChartsModule
    
  ],
  providers: [AuthService,
    { provide: HTTP_INTERCEPTORS,useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
