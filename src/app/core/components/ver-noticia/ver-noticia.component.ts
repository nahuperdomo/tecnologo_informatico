import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NoticiaService } from '../../services/noticia.service';
import { Noticia } from '../../models/noticia';
import { CargandoComponent } from '../cargando/cargando.component';
@Component({
  selector: 'ns-ver-noticia',
  templateUrl: './ver-noticia.component.html',
  styleUrls: ['./ver-noticia.component.css']
})
export class VerNoticiaComponent implements OnInit {
  constructor(private rutaActiva: ActivatedRoute, private servNoticia: NoticiaService) { }
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
}