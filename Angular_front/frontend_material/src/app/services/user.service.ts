import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //traer lista
  private API_SERVER_GET= "http://localhost:8080/user/traer";

  //traer uno
  private API_SERVER_GET_ONE= "http://localhost:8080/user";
  
  //borrar 
  private API_SERVER_DELETE= "http://localhost:8080/user/borrar";

  //editar
  private API_SERVER_UPDATE= "http://localhost:8080/user/editar";

  private DEMO="http://localhost:8080/api/v1/demo"

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllUsuario(): Observable<any> {
    return this.httpClient.get(this.API_SERVER_GET)
      .pipe(catchError(this.handleError));
  }
  
  
  public deleteUsuario(id:any):Observable<any>{
    return this.httpClient.delete(this.API_SERVER_DELETE+"/"+id);
  }

  getUser(id: number) {
    return this.httpClient.get(`${this.API_SERVER_GET_ONE}/traer/${id}`);
  }

 
  updateUsuario(user: any) {
    const url = `${this.API_SERVER_UPDATE}/${user.id}`; 
    return this.httpClient.put(url, user);  
  }

  public demo(): Observable<any> {
    return this.httpClient.post(this.DEMO, null); 
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
    return throwError('Algo salió mal; por favor, inténtalo de nuevo más tarde.');
}


}
