import { Component, OnInit } from '@angular/core';
import { Documento } from '../../models/documento';
import { DocumentoService } from '../../services/documento.service';
import {CargandoComponent} from '../../components/cargando/cargando.component';
import Swal from 'sweetalert2';

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
    if(tipo == "0"){
      this.tipo = "INFORMACION_CARRERA";
    }
    if(tipo == "1"){
      this.tipo = "OPORTUNIDADES_LABORALES";
    }
    if(tipo == "2"){
      this.tipo = "DATOS_DE_INTERES";
    }
      console.log(tipo);
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

  reparto(docs: Documento[],tipo:string): void {
    if(this.tipo == "INFORMACION_CARRERA"){
      this.documentosInformacion = docs;
      for(let doc of this.documentosInformacion){
        console.log(doc.id,doc.titulo);
      }
    }
    if(this.tipo == "OPORTUNIDADES_LABORALES"){
        this.documentosOportunidades = docs;
    }
    if(this.tipo == "DATOS_DE_INTERES"){
        this.documentosInteres = docs;
    }
  }

  ngOnInit(): void {
    this.cargando = true;
    let tipo = this.tipo;
    let documentos: Documento[] = [];
    this.servDocumento.getDocumentosActivos(this.tipo).subscribe({
      next: value =>{ this.reparto(value,tipo) },
      error: err => { Swal.fire('Error al cargar las noticias: ' + err) },
      complete: () => { this.cargando = false; }
    });
  }
}
