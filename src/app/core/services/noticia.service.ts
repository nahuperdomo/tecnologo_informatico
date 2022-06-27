import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Noticia } from '../models/noticia';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { NoticiaPagedListResponse } from '../models/noticia-paged-list-response';



@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  constructor(private http: HttpClient) { }

  getNoticias(offset: number, limit: number) {
    return this.http.get<NoticiaPagedListResponse>('https://ria2022.test.softtero.com/api/Noticias/Paged/'+offset+'/'+limit);
  }   


  getNoticiasActivas() {
    return this.http.get<Noticia[]>('https://ria2022.test.softtero.com/api/Noticias/Activas');
  }
}

