import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:8080/auth'; 

  constructor(private http: HttpClient, public tokenService: TokenService) { }

  public login(user: User): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/login`, user);
  }

  public register(user: any): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/register`, user);
  }

  public logout(): void {
    this.tokenService.removeToken();
  }

  
}
