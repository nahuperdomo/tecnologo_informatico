import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NoticiaService } from '../../services/noticia.service';
import { Noticia } from '../../models/noticia';
import { CargandoComponent } from '../cargando/cargando.component';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  public localStorage =  localStorage;
  ngOnInit(): void {
    let id : any;
    id = this.rutaActiva.snapshot.params['id'];
    this.servNoticia.getNoticia(id).subscribe({
      next: value => {
        this.noticia = value;
      },
      error: err => { Swal.fire('Error al cargar las noticias: ' + err)},
      complete: () => {this.cargando = false;}
    });
  }
  public deleteNoticia (){
    this.servNoticia.deleteNoticia(this.noticia.id).subscribe({
      next: value => {
         Swal.fire('NOTICIA ELIMINADA CORRECTAMENTE');
         this.router.navigate(['/noticias']);
      },
      error: err => { Swal.fire('Error al eliminar la noticia')},

    });
  }
}