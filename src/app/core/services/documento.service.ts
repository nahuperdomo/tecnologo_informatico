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
    return this.http.get<DocumentoPagedListResponse>('https://gr5-ria2022.test.softtero.com/api/Documentos/Paged/'+ page +'/'+ pageSize);
  }

  getDocumentosActivos(tipo: string) {
    return this.http.get<Documento[]>('https://gr5-ria2022.test.softtero.com/api/Documentos/Activos?tipo=' + tipo);
  }

  newDocumento(documento: Documento) {
    return this.http.post<Documento>('https://gr5-ria2022.test.softtero.com/api/Documentos', documento);
  }

  updateDocumento(documento: Documento) {
    return this.http.put<Documento>('https://gr5-ria2022.test.softtero.com/api/Documentos', documento);
  }
}
