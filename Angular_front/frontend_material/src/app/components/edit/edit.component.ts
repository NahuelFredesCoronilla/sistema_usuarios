import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  form: FormGroup;
  id: number;
  originalUserData!: User;
  idLoged!: number;

  constructor(private fb: FormBuilder,
    private aRouter: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar

  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: [''],
      confirmPassword: [''],
      creationDate: [''],
      role: ['']

    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.userService.getCurrentUserId().subscribe(
      userId => {
        this.idLoged = userId;
        console.log(userId)
      },
      error => {
        console.error('Error al obtener el ID del usuario logueado:', error);
      }
    );
    if (this.id != 0) {

      this.getUser(this.id);
    }
  }
  getUser(id: number) {
    this.userService.getUser(id).subscribe((data: any) => {
      this.originalUserData = data as User;
      this.form.setValue({
        username: this.originalUserData.username,
        firstname: this.originalUserData.firstname,
        lastname: this.originalUserData.lastname,
        password: '',
        confirmPassword: '',
        creationDate: this.originalUserData.creationDate,
        role: this.originalUserData.role
      });
    });
  }
  update() {
    const user: User = {
      id: this.id,
      username: this.form.value.username,
      firstname: this.form.value.firstname,
      lastname: this.form.value.lastname,
      password: this.form.value.password ,
      

      confirmPassword: this.form.value.confirmPassword ,

      creationDate: this.originalUserData.creationDate,
      role: this.originalUserData.role
    };
    if (this.form.invalid) {
      this.snackBar.open('Por favor complete todos los campos correctamente', 'Error', { duration: 5000 });
      return;
    }

    // Validamos que las contraseñas sean iguales
    if (user.password !== user.confirmPassword) {
      this.snackBar.open('Las contraseñas ingresadas son distintas', 'Error', { duration: 5000 });
      return;
    }

    if (this.id == this.idLoged) {
      this.userService.updateCurrentUser(user).subscribe(() => {
        this.snackBar.open(`El usuario fue modificado con éxito`, '', { duration: 5000 });
        this.router.navigate(['maquinaria']);

      },
        error => {
          console.error('Error al editar usuario: ', error);
          this.snackBar.open('No tienes los permisos necesarios para realizar esta accion', '', { duration: 5000 });

        }

      );
    } else if (this.id !== 0) {

      user.id = this.id;
      this.userService.updateUsuario(user).subscribe(() => {
        this.snackBar.open(`El usuario fue modificado con éxito`, '', { duration: 5000 });
        this.router.navigate(['dashboard']);

      },
        error => {
          console.error('Error al editar usuario: ', error);
          this.snackBar.open('No tienes los permisos necesarios para realizar esta accion', '', { duration: 5000 });

        }

      )


    }

  }

}
