import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {CargandoComponent} from '../../components/cargando/cargando.component';
type NewType = PageEvent;
import { Documento } from '../../models/documento';
import { DocumentoService } from '../../services/documento.service';
import Swal from 'sweetalert2';

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



  ngOnInit(): void {
    let bool=true;
    let inicio = this.page * this.pageSize;
    let fin = inicio + this.pageSize;
    this.servDocumento.getDocumentos(inicio,fin).subscribe({
      next: value => {
        this.length = value.size
        this.documentos = value.list;
      },
      error: err => { Swal.fire('Error al cargar los documentos: ' + err)},
      complete: () => {this.cargando  = false;}
    });

  }
  }


