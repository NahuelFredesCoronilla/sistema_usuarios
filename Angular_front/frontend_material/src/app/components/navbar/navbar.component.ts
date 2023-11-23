import { Token } from '@angular/compiler';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogoutDisabled: boolean = JSON.parse(localStorage.getItem('isLogoutDisabled') || 'false');
  id!:number;
  
  idLoged!: number;
  user!: User;
  rol!: any
  isAdmin: boolean = false;

  constructor(private router: Router, 
    private cdr: ChangeDetectorRef,
    private userService:UserService) {}

  ngOnInit(): void {
    //compruebo que el usuario este logueado antes de obtener el id
    if(localStorage.getItem("token")!==null){
      this.userService.getCurrentUserId().subscribe(
        userId => {
          this.idLoged = userId;
          this.userService.getUser(this.idLoged).subscribe(
            (user: any) => {
              this.user = user;
           
              this.rol = this.user.role;
  
              if (this.rol === 'ADMIN') {
                this.isAdmin = true;
              }
            },
            error => {
              console.error('Error al obtener datos del usuario:', error);
            }
          );
  
        },
        error => {
          console.error('Error al obtener el ID del usuario logueado:', error);
        }
      );
    }
}

  logout(): void {
    this.isLogoutDisabled = false; 
    localStorage.setItem('isLogoutDisabled', JSON.stringify(this.isLogoutDisabled));
  
    
    localStorage.removeItem("token");
    this.router.navigate(["login"]);
  }
}
