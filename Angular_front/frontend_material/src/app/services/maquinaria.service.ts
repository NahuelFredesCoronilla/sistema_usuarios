import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaquinariaService {
 //traer lista de maquinaria
 private API_SERVER_GET="http://localhost:8080/maquinaria/traer"

 //borrar 
 private API_SERVER_DELETE = "http://localhost:8080/maquinaria/borrar";

 //crear
 private API_SERVER_CREATE = "http://localhost:8080/maquinaria/crear";

 //editar
 private API_SERVER_UPDATE = "http://localhost:8080/maquinaria/editar";



  constructor(
    private httpClient:HttpClient
  ) { }

public getAllMaquinaria():Observable<any>{
  return this.httpClient.get(this.API_SERVER_GET)
  .pipe(catchError(this.handleError));

}

public getMaquinaria(id:any):Observable<any>{
  return this.httpClient.get(this.API_SERVER_GET+"/"+id)
  .pipe(catchError(this.handleError));
}

public deleteMaquinaria(id:any):Observable<any>{
  return this.httpClient.delete(this.API_SERVER_DELETE+"/"+id)
  .pipe(catchError(this.handleError));

}

public createMaquinaria(maquinaria:any):Observable<any>{
  return this.httpClient.post(this.API_SERVER_CREATE,maquinaria)
  .pipe(catchError(this.handleError));

}

public updateMaquinaria(id:any,maquinaria:any):Observable<any>{
  return this.httpClient.put(this.API_SERVER_UPDATE+"/"+id,maquinaria)
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