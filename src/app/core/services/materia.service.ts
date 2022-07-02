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
    return this.http.get<Materia[]>('https://gr5-ria2022.test.softtero.com/api/Materias');
  }
  newMateria(materia: Materia) {
    return this.http.post<Materia>('https://gr5-ria2022.test.softtero.com/api/Materias', materia);
  }

  updateMateria(materia: Materia) {
    return this.http.put<Materia>('https://gr5-ria2022.test.softtero.com/api/Materias/' + materia.id, materia);
  }
  deleteMateria(id: number) {
    return this.http.delete<Materia>('https://gr5-ria2022.test.softtero.com/api/Materias/' + id);
  }

}
