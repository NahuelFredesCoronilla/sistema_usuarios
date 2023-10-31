import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private snackBar: MatSnackBar) {} 

  msjError(e: HttpErrorResponse) {
    if (e.error.msg) {
      this.snackBar.open(e.error.msg, 'Error'); 
    } else {
      this.snackBar.open('Upps ocurrió un error, comuníquese con el administrador', 'Error'); // Corregido
    }
  }
}
