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
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

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
  fechasOcupadas: Date[] = [];
  maquinaIdSeleccionada!: number; 

  constructor(private alquilerService: AlquilerService,
    private userService: UserService,
    private maquinariaService :MaquinariaService,
    private aRouter: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dateAdapter: DateAdapter<Date>) {

      this.dateAdapter.setLocale('es-ES');
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

      this.cargarFechasOcupadas();
    }
  

  solicitarAlquiler() {
    this.solicitud.usuarioId=this.idLoged;
    this.solicitud.maquinariaId=this.idMaquinaria;
    const confirmacion = confirm(`¿Estás seguro de que desea alquilar esta maquinaria?`);
    if(confirmacion){
    this.alquilerService.solicitarAlquiler(this.solicitud).subscribe(
      (response) => {
        console.log('Alquiler solicitado con éxito:', response);
        this.snackBar.open("alquiler solicitado con exito", '', { duration: 5000 });
        this.router.navigate(['maquinaria']);
      },
      (error) => {
        console.error('Error al solicitar alquiler:', error);
        this.snackBar.open("Error al solicitar alquiler, la maquina esta ocupada para esa fecha", 'Error', { duration: 5000 });
        if (error instanceof HttpErrorResponse) {
          console.error('Estado del error:', error.status);
          console.error('Cuerpo del error:', error.error);
        }
      }
    );
    }
  }
  cargarFechasOcupadas() {
    this.maquinaIdSeleccionada=this.idMaquinaria
    this.alquilerService.obtenerFechasOcupadas(this.maquinaIdSeleccionada)
        .subscribe(fechasOcupadas => {
          console.log('Fechas ocupadas:', fechasOcupadas);
          this.fechasOcupadas = fechasOcupadas.map(fecha => new Date(fecha[0], fecha[1] - 1, fecha[2]));
        });
}
 
  fechaSeleccionada(event: MatDatepickerInputEvent<Date>) {
    const fechaSeleccionada = event.value;
    
}
filtroFechas = (fecha: Date | null): boolean => {
  return !this.fechasOcupadas.some(fechaOcupada => fechaOcupada.getTime() === fecha?.getTime());
};


  
}
