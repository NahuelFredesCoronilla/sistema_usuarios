import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Maquinaria } from 'src/app/interfaces/Maquinaria';
import { User } from 'src/app/interfaces/user';
import { AlquilerService } from 'src/app/services/alquiler.service';
import { MaquinariaService } from 'src/app/services/maquinaria.service';
import { UserService } from 'src/app/services/user.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-mis-alquileres',
  templateUrl: './mis-alquileres.component.html',
  styleUrls: ['./mis-alquileres.component.css']
})
export class MisAlquileresComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  maquinarias: any[] = [];
  maquinaria!: Maquinaria;
  idLoged!: number;
  id!: number;
  user!: User;
  rol!: any
  isAdmin: boolean = false;
  alquileres: any[] = []
  dataSource!: MatTableDataSource<any>;
  filterInputValue: string = '';
  originalData: any[] = [];

  constructor(private alquilerService: AlquilerService,
    private userService: UserService,
    private maquinariaService: MaquinariaService,
    private aRouter: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource<any>([]);
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const searchText = filter.toLowerCase();
      return (
        data.id.toString().includes(searchText) ||
        data.maquinaria.tipo.toLowerCase().includes(searchText) ||
        (data.maquinaria.marca + ' ' + data.maquinaria.modelo).toLowerCase().includes(searchText) ||
        data.fechaInicio.toString().toLowerCase().includes(searchText) ||
        data.duracion.toString().includes(searchText) ||
        data.valorAlquilerTotal.toString().includes(searchText) ||
        data.activo.toString().toLowerCase().includes(searchText)
      );
    };
  }

  ngOnInit(): void {
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

    this.id = Number(this.aRouter.snapshot.paramMap.get('id'));
    console.log(this.id)
    this.alquilerService.obtenerHistorialAlquileres(this.id).subscribe(resp => {
      this.alquileres = resp;
      console.log(this.alquileres)
      this.alquileres = this.alquileres;
      this.originalData = this.alquileres;
      this.dataSource.data = this.alquileres;
    },
      error => {
        console.error('Error al obtener historial de alquileres:', error);
      }
    );
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilter2(activo: boolean | null = null) {
    
    if (activo !== null) {
      this.dataSource.data = this.originalData.filter(alquiler => alquiler.activo === activo);
    } else {
      
      this.dataSource.filter = this.filterInputValue.trim().toLowerCase();
    }
  }
}
