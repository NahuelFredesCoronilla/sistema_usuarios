import { HttpErrorResponse } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm!:FormGroup;
isLogoutDisabled: boolean = false;

  constructor(private router: Router,
    private authService:AuthService,
    private errorService : ErrorService,
    private snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.loginForm=this.createFormGroup();
  }
  createFormGroup(): FormGroup{
  return new FormGroup ({
    username: new FormControl("",[Validators.required,Validators.email]),
    password: new FormControl("",[Validators.required])
  })

  }

  login() {
   // Validamos que el usuario ingrese datos
   if (this.loginForm.value.username == '' || this.loginForm.value.password == '') {
    this.snackBar.open('Todos los campos son obligatorios');
    return
  }

    this.authService.login(this.loginForm.value).subscribe({
      next:(response)=>{
       
        
        //almaceno el token en el localstorage
        const token= response.token;
        localStorage.setItem('token',token);
        //activo el boton de logout cuando inicio sesion
        this.isLogoutDisabled = true; 
        localStorage.setItem('isLogoutDisabled', JSON.stringify(this.isLogoutDisabled));
       
        this.router.navigateByUrl('/maquinaria');
        
      },

      error:(e:HttpErrorResponse)=>{
      
      
        this.snackBar.open('Los datos ingresados son incorrectos', 'Cerrar', {
          duration: 3000, // Duración del mensaje en milisegundos (3 segundos en este caso)
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
      
    })
    
  }
}
