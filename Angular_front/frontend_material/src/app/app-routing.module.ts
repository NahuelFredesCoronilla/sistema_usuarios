import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditComponent } from './components/edit/edit.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:"login", component:LoginComponent},
  {path :"signup", component: SignupComponent},
  {path:"dashboard", component: DashboardComponent},
  {path:"edit/:id",component: EditComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
