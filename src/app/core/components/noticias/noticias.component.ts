import { Component, OnInit } from '@angular/core';
import { NoticiaService } from '../../services/noticia.service';
import { Noticia } from '../../models/noticia';
import {PageEvent} from '@angular/material/paginator';

type NewType = PageEvent;

@Component({
  selector: 'ns-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  length = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10]
  page = 0;

  
  pageEvent !: NewType;


  public noticias : Noticia[] = [];
  
  constructor(private servNoticia: NoticiaService) { }

  paginador(pagina: number, cantidad: number){
    this.page=pagina;
    this.pageSize=cantidad;
    this.ngOnInit();
    console.log(this.page);
    console.log(this.pageSize);

  }



  ngOnInit(): void {
    let inicio = this.page * this.pageSize;
    let fin = inicio + this.pageSize;
    this.servNoticia.getNoticias(inicio,fin).subscribe({
      next: value => {this.noticias = value.list,
                      this.length = value.size
      },
      error: err => { alert('Error al cargar las noticias: ' + err) }
    });
  }


}
