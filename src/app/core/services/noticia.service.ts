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
    return this.http.get<NoticiaPagedListResponse>('https://gr5-ria2022.test.softtero.com/api/Noticias/Paged/'+offset+'/'+limit);
  }   
    
  getNoticiasActivas() {
    return this.http.get<Noticia[]>('https://gr5-ria2022.test.softtero.com/api/Noticias/Activas');
  }

  getNoticia(id: number) {
    return this.http.get<Noticia>('https://gr5-ria2022.test.softtero.com/api/Noticias/'+id);
  }

  newNoticia(noticia: Noticia) {
    return this.http.post<Noticia>('https://gr5-ria2022.test.softtero.com/api/Noticias', noticia);
  }

  updateNoticia(noticia: Noticia) {
    return this.http.put<Noticia>('https://gr5-ria2022.test.softtero.com/api/Noticias/'+noticia.id, noticia);
  }

  deleteNoticia (id: number) {
    return this.http.delete<Noticia>('https://gr5-ria2022.test.softtero.com/api/Noticias/'+id);
  }

}

