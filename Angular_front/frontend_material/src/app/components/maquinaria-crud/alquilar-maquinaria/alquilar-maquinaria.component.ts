import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Alquiler } from 'src/app/interfaces/Alquiler';
import { Maquinaria } from 'src/app/interfaces/Maquinaria';
import { AlquilerService } from 'src/app/services/alquiler.service';
import { MaquinariaService } from 'src/app/services/maquinaria.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-alquilar-maquinaria',
  templateUrl: './alquilar-maquinaria.component.html',
  styleUrls: ['./alquilar-maquinaria.component.css']
})
export class AlquilarMaquinariaComponent {
  idLoged!: number;
  idMaquinaria!:number;
  solicitud: any = {};
  maquinaria!:Maquinaria;

  constructor(private alquilerService: AlquilerService,
    private userService: UserService,
    private maquinariaService :MaquinariaService,
    private aRouter: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) {}

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

      this.idMaquinaria = Number(this.aRouter.snapshot.paramMap.get('maquinariaId'));
      console.log(this.idMaquinaria)
      this.maquinariaService.getMaquinaria(this.idMaquinaria).subscribe(
        (maquinaria: Maquinaria) => {
          this.maquinaria = maquinaria;
          console.log('Datos de la maquinaria:', this.maquinaria);
          this.solicitud.valorPorDia=this.maquinaria.precio;
        },
        error => {
          console.error('Error al obtener datos de la maquinaria:', error);
        }
      );
     
    }
  

  solicitarAlquiler() {
    this.solicitud.usuarioId=this.idLoged;
    this.solicitud.maquinariaId=this.idMaquinaria;
    this.alquilerService.solicitarAlquiler(this.solicitud).subscribe(
      (response) => {
        console.log('Alquiler solicitado con éxito:', response);
        this.snackBar.open("alquiler solicitado con exito");
      },
      (error) => {
        console.error('Error al solicitar alquiler:', error);
        this.snackBar.open("Error al solicitar alquiler, la maquina esta ocupada para esa fecha");
        if (error instanceof HttpErrorResponse) {
          console.error('Estado del error:', error.status);
          console.error('Cuerpo del error:', error.error);
        }
      }
    );
  }
  

  
}
