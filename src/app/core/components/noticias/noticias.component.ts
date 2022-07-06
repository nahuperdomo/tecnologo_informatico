import { Component, OnInit } from '@angular/core';
import { NoticiaService } from '../../services/noticia.service';
import { Noticia } from '../../models/noticia';
import {PageEvent} from '@angular/material/paginator';
import {CargandoComponent} from '../../components/cargando/cargando.component';
type NewType = PageEvent;
import Swal from 'sweetalert2';

@Component({
  selector: 'ns-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  public localStorage = localStorage;
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10];
  page = 0;
  cargando = true;
  pageEvent !: NewType;


  public noticias : Noticia[] = [];
  
  constructor(private servNoticia: NoticiaService) {

   }

  paginador(pagina: number, cantidad: number){
    this.page=pagina;
    this.pageSize=cantidad;
    this.ngOnInit();
    console.log(this.page);
    console.log(this.pageSize);
  }

  public cortadorString(not:Noticia[]): Noticia[]{
    for (let i = 0 ; i <not.length; i++) {
      if(not[i].titulo.length>100){
      not[i].titulo = not[i].titulo.slice(0,100);
      not[i].titulo = not[i].titulo.concat ("...");
      }
      if(not[i].descripcion.length>300){
      not[i].descripcion = not[i].descripcion.slice(0,350);
      not[i].descripcion = not[i].descripcion.concat ("...");
      }
    }
    return not
    
  }

  ngOnInit(): void {
    let bool=true;
    let inicio = this.page * this.pageSize;
    let fin = inicio + this.pageSize;
    this.servNoticia.getNoticias(inicio,fin).subscribe({
      next: value => {this.noticias = this.cortadorString(value.list) ,
                      this.length = value.size
      },
      error: err => { Swal.fire('Error al cargar las noticias: ' + err)},
      complete: () => {this.cargando  = false;}
    });

  }
}
