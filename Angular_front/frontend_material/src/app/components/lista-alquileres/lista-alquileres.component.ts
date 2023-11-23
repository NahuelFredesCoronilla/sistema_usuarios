import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AlquilerService } from 'src/app/services/alquiler.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-lista-alquileres',
  templateUrl: './lista-alquileres.component.html',
  styleUrls: ['./lista-alquileres.component.css']
})
export class ListaAlquileresComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  alquileres: any[] = [];
  dataSource: MatTableDataSource<any>;
  filterInputValue: string = '';

  
  originalData: any[] = [];

  constructor(private alquilerService: AlquilerService) {
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
    this.alquilerService.obtenerTodosLosAlquileres().subscribe(
      (alquileres) => {
        this.alquileres = alquileres;
        this.originalData = alquileres;
        this.dataSource.data = alquileres; 
      },
      (error) => {
        console.error('Error al obtener los alquileres:', error);
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

