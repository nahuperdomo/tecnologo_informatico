import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Noticia } from '../models/noticia';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  constructor(private http: HttpClient) { }

  getNoticias() {
    return this.http.get<Noticia[]>('https://ria2022.test.softtero.com/api/Noticias/Activas');
  }
}

