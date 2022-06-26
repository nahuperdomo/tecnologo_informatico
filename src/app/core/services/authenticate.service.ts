import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login-model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient) { }

  logear (login: LoginModel): Observable<any> {
    return this.http.post<string>('https://ria2022.test.softtero.com/api/Noticias/Activas', login);
  }
}
