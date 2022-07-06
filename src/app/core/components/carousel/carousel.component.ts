import { Component, OnInit } from '@angular/core';
import { NoticiaService } from '../../services/noticia.service';
import { Noticia } from '../../models/noticia';
import { CargandoComponent } from '../cargando/cargando.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'ns-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  public cargando = true;
  public noticias : Noticia[] = [] ;
  constructor(private servNoticia : NoticiaService) { }

  ngOnInit(): void {
    this.servNoticia.getNoticiasActivas().subscribe({
      next: value => {this.noticias = value},
      error: err => { Swal.fire('Error al cargar las noticias: ' + err)},
      complete: () => {
        this.cargando = false;
      }
    });


    


  }



}
