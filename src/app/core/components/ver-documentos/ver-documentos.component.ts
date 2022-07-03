import { Component, OnInit } from '@angular/core';
import { Documento } from '../../models/documento';
import { DocumentoService } from '../../services/documento.service';
import {CargandoComponent} from '../../components/cargando/cargando.component';

@Component({
  selector: 'ns-ver-documentos',
  templateUrl: './ver-documentos.component.html',
  styleUrls: ['./ver-documentos.component.css']
})
export class VerDocumentosComponent implements OnInit {

  public documentosInteres : Documento[] = [];
  public documentosOportunidades : Documento[] = [];
  public documentosInformacion : Documento[] = [];
  public cargando = true;

  public tipo = "INFORMACION_CARRERA";

  public setTipo (tipo: string): void {
    this.tipo = tipo;
    this.ngOnInit();
  }
  constructor(private servDocumento: DocumentoService) { }
  
  downloadPdf(base64String:string, fileName:string) {
    const source = base64String;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`
    link.click();
  }

  onClickDownloadPdf(base64String:string, fileName:string) {
    this.downloadPdf(base64String,fileName);
  }

  reparto(docs: Documento[]): void {
    if(this.tipo == "INFORMACION_CARRERA"){
      this.documentosInformacion = docs;
    }
    if(this.tipo == "OPORTUNIDADES_CARRERA"){
        this.documentosOportunidades = docs;
    }
    if(this.tipo == "INTERES_CARRERA"){
        this.documentosInteres = docs;
    }
  }

  ngOnInit(): void {
    this.cargando = true;
    let documentos: Documento[] = [];
    this.servDocumento.getDocumentosActivos(this.tipo).subscribe({
      next: value =>{ this.reparto(value)  },
      error: err => { alert('Error al cargar las noticias: ' + err) },
      complete: () => { this.cargando = false; }
    });


  }
}
