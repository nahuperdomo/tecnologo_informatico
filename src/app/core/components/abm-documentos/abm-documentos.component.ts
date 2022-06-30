import { Component, OnInit } from '@angular/core';
import { Documento } from '../../models/documento';
import { DocumentoPagedListResponse } from '../../models/documento-paged-list-response';
import { DocumentoService } from '../../services/documento.service';
import { MatOption } from '@angular/material/core';


@Component({
  selector: 'ns-abm-documentos',
  templateUrl: './abm-documentos.component.html',
  styleUrls: ['./abm-documentos.component.css']
})
export class AbmDocumentosComponent implements OnInit {

  public selected :Documento = new Documento(-1, "Documento1", "Programacion", "soyunpdf", true);
  public eleccion = "Vista";
  public documentos : Documento[] = [];

  constructor(private servDocumento: DocumentoService) { }

  public setEleccion (eleccion: string): void {
    this.eleccion = eleccion;
  }

  public setSelected (documento: Documento): void {
    this.selected = documento;
    console.log(this.selected);
  }
  
  ngOnInit(): void {
    this.servDocumento.getDocumentos(1, 200).subscribe({
      next: value => console.log(value),
      error: err => { alert('Error al cargar los documentos: ' + err) }
    });
  }
}