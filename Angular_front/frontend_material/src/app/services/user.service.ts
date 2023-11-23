import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //traer lista
  private API_SERVER_GET = "http://localhost:8080/user/traer";

  //traer uno
  private API_SERVER_GET_ONE = "http://localhost:8080/user/traer/";

  //borrar 
  private API_SERVER_DELETE = "http://localhost:8080/user/borrar";

  //editar
  private API_SERVER_UPDATE = "http://localhost:8080/user/editar";

  //traer id logueado
  private API_SERVER_GET_LOGED = "http://localhost:8080/user/current-id";

  //editar propio
  private API_SERVER_UPDATE_LOGED = "http://localhost:8080/user/edita/current"



  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllUsuario(): Observable<any> {
    return this.httpClient.get(this.API_SERVER_GET)
      .pipe(catchError(this.handleError));
  }

  public getUsuario(id:any): Observable<any>{
    return this.httpClient.get(this.API_SERVER_GET_ONE+id)
  }

  public deleteUsuario(id: any): Observable<any> {
    return this.httpClient.delete(this.API_SERVER_DELETE + "/" + id)
      .pipe(catchError(this.handleError));
  }

  getUser(id: number) {
    return this.httpClient.get(`${this.API_SERVER_GET_ONE}${id}`)
      .pipe(catchError(this.handleError));
  }


  updateUsuario(user: any) {
    const url = `${this.API_SERVER_UPDATE}/${user.id}`;
    return this.httpClient.put(url, user)
      .pipe(catchError(this.handleError));
  }

  getCurrentUserId(): Observable<number> {
    return this.httpClient.get<any>(this.API_SERVER_GET_LOGED).pipe(
      map(response => {

        const userId = Number(response);


        if (!isNaN(userId)) {
          return userId;
        } else {

          console.error('No se pudo convertir a número:', response);
          throw new Error('No se pudo obtener el ID del usuario.');
        }
      })
    );
  }


  updateCurrentUser(user: User): Observable<User> {
    const url = (this.API_SERVER_UPDATE_LOGED);
    return this.httpClient.put<User>(url, user);
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
