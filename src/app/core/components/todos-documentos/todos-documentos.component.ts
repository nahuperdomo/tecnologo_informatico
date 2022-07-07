import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {PageEvent} from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
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
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [];
  page = 0;
  cargando = true;
  pageEvent !: NewType;


  public documentos : Documento[] = [];
  public eleccion = "Vista";
  public doc = new Documento(-1,"","","",false);


public DocumentoForm : FormGroup = new FormGroup({
      Titulo : new FormControl('', [Validators.required,Validators.minLength(1)]),
      Estado : new FormControl(''),
      Tipo : new FormControl(''),
    });


  constructor(private servDocumento: DocumentoService,  private router: Router, private rutaActiva: ActivatedRoute) { 
  }
  paginador(pagina: number, cantidad: number){
    this.page=pagina;
    this.pageSize=cantidad;
    this.cargando = true;
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
  public mostrarModificaciones(documento: Documento){
    //cargar volores en el formulario
    this.DocumentoForm.setValue({
      Titulo : documento.titulo,
      Estado : documento.activo,
      Tipo : documento.tipo,
    });
    this.doc = documento;
    this.eleccion = "Modificar";
    console.log(this.eleccion);
  }

  public guardarModificaciones(){
    if(this.DocumentoForm.valid){
    this.cargando = true;
    this.eleccion='Vista'
    if(this.DocumentoForm.value.Estado == "true"){
      this.doc.activo=true;
    }
    if(this.DocumentoForm.value.Estado == "false"){
      this.doc.activo=false;
    }
    this.doc.titulo = this.DocumentoForm.value.Titulo;
    this.doc.tipo = this.DocumentoForm.value.Tipo;
    this.servDocumento.updateDocumento(this.doc.id,this.doc).subscribe({
      next: value => { this.editarArray(value);
                      this.DocumentoForm.reset();
                      this.eleccion = "Vista";
                      Swal.fire('Documento Modificado'),
                      this.ngOnInit();
                      },
      error: err => {this.eleccion='Modificar', Swal.fire('Error al modificar')},
      complete: () => {this.cargando  = false;} 
    });
    
    this.cargando=false;
  }else{
    Swal.fire( 'Faltan datos');
  }
}


  
  public editarArray(doc: Documento){
    for(let i=0; i<this.documentos.length; i++){
      if(this.documentos[i].id==doc.id){
        this.documentos[i]=doc;
        break;
      }
    }
  }

  public setEleccion(eleccion: string){
    if(eleccion=="Vista"){
      this.DocumentoForm.reset();
      this.eleccion = "Vista";
      this.ngOnInit();
    }
    this.eleccion = eleccion;
  }


  ngOnInit(): void {

    let inicio = this.page * this.pageSize;
    let fin = inicio + this.pageSize;
    this.servDocumento.getDocumentos(inicio,fin).subscribe({
      next: value => {
        this.cargando = true;
        this.documentos = [];
        this.length = value.size
        this.documentos = value.list;
      },
      error: err => { alert('Error al cargar los documentos: ' + err)},
      complete: () => {this.cargando  = false;}
    });

  }
  }