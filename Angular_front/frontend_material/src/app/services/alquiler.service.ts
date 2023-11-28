import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Alquiler } from '../interfaces/Alquiler';

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {
  private baseUrl = 'http://localhost:8080/alquileres';

  constructor(private http: HttpClient) { }

  obtenerHistorialAlquileres(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usuario/${userId}`)
    .pipe(catchError(this.handleError));
  }
  obtenerAlquilerPorId(alquilerId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/traer/${alquilerId}`)
    .pipe(catchError(this.handleError));
  }

  obtenerAlquileresActivos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/activos`)
    .pipe(catchError(this.handleError));
  }

  obtenerAlquileresFinalizados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/finalizados`)
    .pipe(catchError(this.handleError));
  }

  obtenerTodosLosAlquileres(): Observable<Alquiler[]> {
    return this.http.get<Alquiler[]>(`${this.baseUrl}/todos`)
    .pipe(catchError(this.handleError));
  }


  solicitarAlquiler(alquiler: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/solicitar`, alquiler)
    .pipe(catchError(this.handleError));
  }

  finalizarAlquiler(alquilerId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/finalizar?alquilerId=${alquilerId}`, null)
    .pipe(catchError(this.handleError));
  }

  obtenerFechasOcupadas(maquinaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/fechas-ocupadas/${maquinaId}`)
    .pipe(catchError(this.handleError));
  }

  obtenerDuracionTotalPorMaquinarias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/duracion-total-maquinaria`)
    .pipe(catchError(this.handleError));
  }
  uploadContrato(alquilerId: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/upload/${alquilerId}`, formData)
    .pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) { 
    console.error('Error de solicitud:', error);
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      console.error('Error del lado del cliente:', error.error.message);
    } else {
      // El backend retornó un código de error
      console.error(`Código de error: ${error.status}, ` + `body: ${error.error}`);
    }
    // Retorna un observable con un mensaje de error personalizado
    return throwError('Algo salió mal; por favor, inténtalo de nuevo más tarde.')
  }
}
