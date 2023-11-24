import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Maquinaria } from 'src/app/interfaces/Maquinaria';
import { User } from 'src/app/interfaces/user';
import { MaquinariaService } from 'src/app/services/maquinaria.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-maquinaria-crud',
  templateUrl: './maquinaria-crud.component.html',
  styleUrls: ['./maquinaria-crud.component.css']
})
export class MaquinariaCrudComponent implements OnInit {
   
   maquinarias: any[] = [];
   maquinaria!: Maquinaria;
   idLoged!: number;
   user!: User;
   rol!: any;
   isAdmin: boolean = false;
   dataSource!: MatTableDataSource<any>;

   constructor(private maquinariaService: MaquinariaService,
    private userService: UserService,
    private snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource<any>([]);
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const searchText = filter.toLowerCase();
      return (
        data.id.toString().includes(searchText) ||
        (data.maquinaria && data.maquinaria.tipo.toLowerCase().includes(searchText)) ||
        data.marca.toLowerCase().includes(searchText) ||
        data.modelo.toString().toLowerCase().includes(searchText) ||
        data.patente.toString().includes(searchText) ||
        data.anio.toString().includes(searchText) ||
        data.tipo.toString().toLowerCase().includes(searchText)
      );
    };
    

  }

  ngOnInit(): void {
    this.maquinariaService.getAllMaquinaria().subscribe(resp => {
      this.maquinarias = resp;
      this.dataSource.data = resp; 
    },
      error => {
        console.error(error)
      }
    );
  
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

  eliminar(maquinaria: any) {
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar la maquinaria ${maquinaria.modelo}?`);
    if(confirmacion){
      this.maquinariaService.deleteMaquinaria(maquinaria.id).subscribe(
        () => {
          const index = this.maquinarias.findIndex((item: any) => item.id === maquinaria.id);
          if (index !== -1) {
            this.maquinarias.splice(index, 1);
            this.refreshMaquinariaList();  
            this.snackBar.open('La maquinaria fue eliminada con éxito','',{duration:5000});
          }
        },
        error => {
          console.error('Error al eliminar maquinaria: ', error);
          this.snackBar.open('No tienes los permisos necesarios para realizar esta accion','',{duration:5000});
        }
      );
    }
  }

  refreshMaquinariaList() {  
    this.maquinariaService.getAllMaquinaria().subscribe(resp => {
      this.maquinarias = resp;
      this.dataSource.data = [...this.maquinarias];  
    },
      error => {
        console.error(error);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
