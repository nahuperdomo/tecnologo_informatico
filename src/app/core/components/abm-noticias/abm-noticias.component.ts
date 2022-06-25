import { Component, OnInit } from '@angular/core';
import { NoticiaService } from '../../services/noticia.service';
import { Noticia } from '../../models/noticia';
import { Observable } from 'rxjs';


@Component({
  selector: 'ns-abm-noticias',
  templateUrl: './abm-noticias.component.html',
  styleUrls: ['./abm-noticias.component.css']
})
export class AbmNoticiasComponent implements OnInit {
  public selected :Noticia = new Noticia(-1, "", "", "", "");
  public eleccion = "Vista";
  public noticias : Noticia[] = [];

  constructor(private servNoticia: NoticiaService) { }

  public setEleccion (eleccion: string): void {
    this.eleccion = eleccion;
  }
  
  ngOnInit(): void {
    this.servNoticia.getNoticias().subscribe({
      next: value => this.noticias = value,
      error: err => { alert('Error al cargar las noticias: ' + err) }
    });

  }

}
