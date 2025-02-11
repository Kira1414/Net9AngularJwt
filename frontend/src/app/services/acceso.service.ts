import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { ResponseLogin } from '../interfaces/ResponseLogin';
import { Observable } from 'rxjs';
import { User } from '../interfaces/User';
import { Login } from '../interfaces/Login';
import { ResponseRegister } from '../interfaces/ResponseRegister';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;

  constructor() { }

  register(object: User): Observable<ResponseRegister> {
    return this.http.post<ResponseRegister>(`${this.baseUrl}/Access/register`, object);
  }
  
  login(object: Login): Observable<ResponseLogin> {
    return this.http.post<ResponseLogin>(`${this.baseUrl}/Access/login`, object);
  }
}
