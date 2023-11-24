import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alquiler } from '../interfaces/Alquiler';

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {
  private baseUrl = 'http://localhost:8080/alquileres';

  constructor(private http: HttpClient) { }

  obtenerHistorialAlquileres(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usuario/${userId}`);
  }
  obtenerAlquilerPorId(alquilerId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/traer/${alquilerId}`);
  }

  obtenerAlquileresActivos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/activos`);
  }

  obtenerAlquileresFinalizados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/finalizados`);
  }

  obtenerTodosLosAlquileres(): Observable<Alquiler[]> {
    return this.http.get<Alquiler[]>(`${this.baseUrl}/todos`);
  }


  solicitarAlquiler(alquiler: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/solicitar`, alquiler);
  }

  finalizarAlquiler(alquilerId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/finalizar?alquilerId=${alquilerId}`, null);
  }

  obtenerFechasOcupadas(maquinaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/fechas-ocupadas/${maquinaId}`);
  }

  obtenerDuracionTotalPorMaquinarias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/duracion-total-maquinaria`);
  }
  uploadContrato(alquilerId: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/upload/${alquilerId}`, formData);
  }

}
