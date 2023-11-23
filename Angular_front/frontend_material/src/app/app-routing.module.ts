import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditComponent } from './components/edit/edit.component';
import { MaquinariaCrudComponent } from './components/maquinaria-crud/maquinaria-crud.component';
import { CrearComponent } from './components/maquinaria-crud/crear/crear.component';
import { EditMaquinariaComponent } from './components/maquinaria-crud/edit-maquinaria/edit-maquinaria.component';
import { AlquilarMaquinariaComponent } from './components/maquinaria-crud/alquilar-maquinaria/alquilar-maquinaria.component';
import { MisAlquileresComponent } from './components/mis-alquileres/mis-alquileres.component';
import { DetallesMiAlquilerComponent } from './components/mis-alquileres/detalles-mi-alquiler/detalles-mi-alquiler.component';
import { ListaAlquileresComponent } from './components/lista-alquileres/lista-alquileres.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:"login", component:LoginComponent},
  {path :"signup", component: SignupComponent},
  {path:"dashboard", component: DashboardComponent},
  {path:"edit/:id",component: EditComponent},
  {path:"maquinaria",component:MaquinariaCrudComponent},
  {path:"crear_maquinaria",component:CrearComponent},
  {path:"editar_maquinaria/:id",component:EditMaquinariaComponent},
  {path:"alquilar/:maquinariaId",component:AlquilarMaquinariaComponent},
  {path:"mis_alquileres/:id",component:MisAlquileresComponent},
  {path:"detalles_mi_alquiler/:id",component:DetallesMiAlquilerComponent},
  {path:"lista_alquileres",component:ListaAlquileresComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
