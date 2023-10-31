import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth.service';
import { ErrorService } from 'src/app/services/error.service';
import { User } from 'src/app/interfaces/user';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup; 

  constructor(
    private router: Router,
    private authService: AuthService,
    private errorService: ErrorService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    
  ) {
   
  }
  ngOnInit(): void {
    this.signupForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({      
      username: new FormControl("", [Validators.required, Validators.email]),
      firstname: new FormControl("",Validators.required),
      lastname: new FormControl('', Validators.required),
      password: new FormControl("", [ Validators.required,]),
      confirmPassword: new FormControl("", [ Validators.required,]),
      
   
   
    });
  }
  signup(): void {
      // Validamos que el usuario ingrese valores
      if (this.signupForm.invalid) {
        this.snackBar.open('Todos los campos son obligatorios', 'Error',{duration:5000});
        return;
      }
  
      const { username, password, firstname, lastname, confirmPassword } = this.signupForm.value;
  
      // Validamos que las contraseñas sean iguales
      if (password !== confirmPassword) {
        this.snackBar.open('Las contraseñas ingresadas son distintas', 'Error',{duration:5000});
        return;
      }
      
    this.authService.register(this.signupForm.value).subscribe({
      next: (data)=> {
      this.snackBar.open(`El usuario fue registrado con éxito`,'',{duration:5000});
      console.log(data);
      this.router.navigate(["login"]);
  }});
  }
  


 
}
