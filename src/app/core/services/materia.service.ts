import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Materia } from '../models/materia';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  constructor(private http: HttpClient) { }

  getMaterias() {
    return this.http.get<Materia[]>('https://ria2022.test.softtero.com/api/Materias');
  }

}
