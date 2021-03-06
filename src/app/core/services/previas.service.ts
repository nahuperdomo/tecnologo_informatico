import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Previatura } from '../models/previatura';
import { UnidadCurricular } from '../models/unidad-curricular';
import { PreviaCreateDTO } from '../models/previa-create-dto';
import { StatusDTO } from '../models/status-dto';



@Injectable({
  providedIn: 'root'
})
export class PreviasService {

  constructor(private http: HttpClient) { }

  agregarPrevia(unidadCurricular: number, previa: number, tipoPrevia: string ) {
    let p = new PreviaCreateDTO(unidadCurricular, previa, tipoPrevia);
    return this.http.post<Previatura>('https://gr5-ria2022.test.softtero.com/api/Previas', p);
  }

  deletePrevia(id: number) {
    return this.http.delete<StatusDTO>('https://gr5-ria2022.test.softtero.com/api/Previas/'+id);
  }

}
