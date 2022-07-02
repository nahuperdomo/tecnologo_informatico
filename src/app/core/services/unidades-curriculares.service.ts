import { Injectable, Output } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UnidadCurricular } from '../models/unidad-curricular';
import { Previatura } from '../models/previatura';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { NoticiaPagedListResponse } from '../models/noticia-paged-list-response';

@Injectable({
  providedIn: 'root'
})
export class UnidadesCurricularesService {

  constructor(private http: HttpClient) { }

  getUnidadesCurriculares() {
    return this.http.get<UnidadCurricular[]>('https://gr5-ria2022.test.softtero.com/api/UnidadesCurriculares');
  }

}
