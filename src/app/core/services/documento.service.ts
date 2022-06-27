import { Injectable } from '@angular/core';
import { Documento } from '../models/documento';
import { DocumentoPagedListResponse } from '../models/documento-paged-list-response';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  
  constructor(private http: HttpClient) {}

  getDocumentos(page: number, pageSize: number) {
    return this.http.get<DocumentoPagedListResponse>('https://ria2022.test.softtero.com/api/Documentos/Paged/'+ page +'/'+ pageSize);
  }

  getDocumentosActivos(tipo: string) {
    return this.http.get<DocumentoPagedListResponse>('https://ria2022.test.softtero.com/api/Documentos/Activos?tipo=' + tipo);
  }
}
