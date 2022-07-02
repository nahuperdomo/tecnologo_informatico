import { Component, OnInit } from '@angular/core';
import { Documento } from '../../models/documento';
import { DocumentoService } from '../../services/documento.service';
@Component({
  selector: 'ns-ver-documentos',
  templateUrl: './ver-documentos.component.html',
  styleUrls: ['./ver-documentos.component.css']
})
export class VerDocumentosComponent implements OnInit {

  public documentos : Documento[] = [];
  public tipo = "INFORMACION_CARRERA";

  public setTipo (tipo: string): void {
    this.tipo = tipo;
  }
  constructor(private servDocumento: DocumentoService) { }

  ngOnInit(): void {

    this.servDocumento.getDocumentosActivos(this.tipo).subscribe({
      next: value => this.documentos = value.list,
      error: err => { alert('Error al cargar las noticias: ' + err) }
    });

  }
}
