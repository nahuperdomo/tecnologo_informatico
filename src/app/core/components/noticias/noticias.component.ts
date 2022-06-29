import { Component, OnInit } from '@angular/core';
import { NoticiaService } from '../../services/noticia.service';
import { Noticia } from '../../models/noticia';

@Component({
  selector: 'ns-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  public length = 100;
  public pageSize = 10;
  public pageIndex = 0;
  public noticias : Noticia[] = [];
  
  constructor(private servNoticia: NoticiaService) { }

  ngOnInit(): void {
    this.getNoticias(1,5);
  }

  public getNoticias(offset: number, limit: number):void {
    this.servNoticia.getNoticias(offset,limit).subscribe({
      next: value => this.noticias = value.list,
      error: err => { alert('Error al cargar las noticias: ' + err) }
    });
  }

  public onPageChange(event: any): void {
    console.log(this.pageIndex);
  }
}
