import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {CargandoComponent} from '../../components/cargando/cargando.component';
type NewType = PageEvent;
import { Documento } from '../../models/documento';
import { DocumentoService } from '../../services/documento.service';
@Component({
  selector: 'ns-todos-documentos',
  templateUrl: './todos-documentos.component.html',
  styleUrls: ['./todos-documentos.component.css']
})
export class TodosDocumentosComponent implements OnInit {
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10];
  page = 0;
  cargando = true;
  pageEvent !: NewType;


  public documentos : Documento[] = [];

  constructor(private servDocumento: DocumentoService) { }

  paginador(pagina: number, cantidad: number){
    this.page=pagina;
    this.pageSize=cantidad;
    this.ngOnInit();
    console.log(this.page);
    console.log(this.pageSize);
  }

  activarDesactivar(doc: Documento){
    this.cargando = true;
    ///extraer documento del array por id
    if(doc.activo){
      doc.activo=false;
    }else{
      doc.activo=true;
    }
    this.servDocumento.updateDocumento(doc.id,doc).subscribe({
      next: value => {
        this.editarArray(value);
            },
      error: err => { alert('Error al cargar los documentos: ' + err)},
      complete: () => {this.cargando  = false;}
    });
  }
  
  public editarArray(doc: Documento){
    for(let i=0; i<this.documentos.length; i++){
      if(this.documentos[i].id==doc.id){
        this.documentos[i]=doc;
        break;
      }
    }
  }

  




  ngOnInit(): void {

    let inicio = this.page * this.pageSize;
    let fin = inicio + this.pageSize;
    this.servDocumento.getDocumentos(inicio,fin).subscribe({
      next: value => {
        this.documentos = [];
        this.length = value.size
        this.documentos = value.list;
      },
      error: err => { alert('Error al cargar los documentos: ' + err)},
      complete: () => {this.cargando  = false;}
    });

  }
  }


