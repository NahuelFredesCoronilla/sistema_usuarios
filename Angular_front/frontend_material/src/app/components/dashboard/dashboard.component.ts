import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usuarios: any[]=[];
  isAdmin:boolean=false;
  user!: User;
  rol!:string;
  

  constructor(private userService: UserService,
    private router: Router,
    private snackBar:MatSnackBar) { 
 
  }

  ngOnInit(): void {
    this.userService.getAllUsuario().subscribe(resp =>{
      this.usuarios=resp;
    
    },
    error =>{console.error(error)}

    );
    
    
  }

  

  eliminar(user: any) {
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar el usuario ${user.username}?`);
    if(confirmacion){
    this.userService.deleteUsuario(user.id).subscribe(
        () => {
            const index = this.usuarios.findIndex((item: any) => item.id === user.id);
            if (index !== -1) {
                this.usuarios.splice(index, 1);
                this.refreshUserList();
                this.snackBar.open('El usuario fue eliminado con exito','',{duration:5000});
            }
        },
        error => {
            console.error('Error al eliminar usuario: ', error);
            this.snackBar.open('No tienes los permisos necesarios para realizar esta accion','',{duration:5000});
        }
    );
      }
}
refreshUserList() {
  this.userService.getAllUsuario().subscribe(resp => {
    this.usuarios = resp;
  },
  error => {
    console.error(error);
  });
}







}
