import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NoticiaService } from '../../services/noticia.service';
import { Noticia } from '../../models/noticia';
import { CargandoComponent } from '../cargando/cargando.component';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

type NewType = PageEvent;

@Component({
  selector: 'ns-ver-noticia',
  templateUrl: './ver-noticia.component.html',
  styleUrls: ['./ver-noticia.component.css']
})

export class VerNoticiaComponent implements OnInit {
  constructor(private rutaActiva: ActivatedRoute, private servNoticia: NoticiaService, private router: Router) { }
  public noticia = new Noticia(0,'','','','');
  public cargando = true;
  ngOnInit(): void {
    let id : any;
    id = this.rutaActiva.snapshot.params['id'];
    this.servNoticia.getNoticia(id).subscribe({
      next: value => {
        this.noticia = value;
      },
      error: err => { alert('Error al cargar las noticias: ' + err)},
      complete: () => {this.cargando = false;}
    });
  }
  public deleteNoticia (){
    this.servNoticia.deleteNoticia(this.noticia.id).subscribe({
      next: value => {
         alert('NOTICIA ELIMINADA CORRECTAMENTE');
         this.router.navigate(['/noticias']);
      },
      error: err => { alert('Error al eliminar la noticia')},

    });
  }
}