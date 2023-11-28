import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AlquilerService } from 'src/app/services/alquiler.service';
import { FileService } from 'src/app/services/file.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';
import * as fileSaver from 'file-saver';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detalles-mi-alquiler',
  templateUrl: './detalles-mi-alquiler.component.html',
  styleUrls: ['./detalles-mi-alquiler.component.css']
})
export class DetallesMiAlquilerComponent {
  idAlquiler!: number;
  selectedFile: File | undefined;
  idLoged!: number;
  user!: User;
  rol!: any
  isAdmin: boolean = false;

  alquiler: any;
  constructor(private aRouter: ActivatedRoute,
    private alquilerService: AlquilerService,
    private snackBar: MatSnackBar,
    private fileService: FileService,
    private userService: UserService) {

  }
  ngOnInit(): void {
    this.idAlquiler = Number(this.aRouter.snapshot.paramMap.get('id'));
    console.log(this.idAlquiler)
    this.alquilerService.obtenerAlquilerPorId(this.idAlquiler).subscribe(resp => {
      this.alquiler = resp;

    },
      error => {
        console.error('Error al obtener historial de alquileres:', error);
      }
    );
    if (localStorage.getItem("token") !== null) {
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
  finalizarAlquiler() {
    const confirmacion = confirm(`¿Estás seguro de que deseas finalizar el alquiler antes de tiempo? `);
    if (confirmacion) {
      this.alquilerService.finalizarAlquiler(this.idAlquiler).subscribe(() => {
        this.snackBar.open("el alquiler se finalizo correctamente", '', { duration: 5000 });
      })
    }

  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }


  uploadFileWithAlquiler() {
    const confirmacion = confirm(`¿Estás seguro de que quieres subir este archivo? `);
    if (confirmacion) {
    if (this.selectedFile && this.idAlquiler) {
      this.fileService.uploadFileWithAlquiler(this.selectedFile, this.idAlquiler).subscribe(
        response => {
          console.log('documento subido con exito!!', response);
          this.snackBar.open("documento subido con exito", '', { duration: 5000 })
        },
        error => {
          console.error('Error al subir documento', error);
          this.snackBar.open("Error al subir documento", 'Error', { duration: 5000 })
        }
      );
    } else {
      console.error('No file or alquiler ID selected.');
      this.snackBar.open("Error al subir documento", 'Error', { duration: 5000 })
    }
  }
  }
  getFile() {
    const fileId = this.alquiler?.file.id;
    console.log(fileId);

    if (fileId) {

      this.fileService.getFile(fileId).subscribe(
        (response: any) => {
          const blob = new Blob([response], { type: 'application/pdf' });
          saveAs(blob, 'nombre-del-archivo.pdf');
        },
        (error) => {
          console.error('Error getting file:', error);
          this.snackBar.open("Error al descargar documento", 'Error', { duration: 5000 })
        }
      );
    } else {
      console.error('La URL del archivo no está disponible.');
      this.snackBar.open("Error al descargar documento", 'Error', { duration: 5000 })
    }
  }


}