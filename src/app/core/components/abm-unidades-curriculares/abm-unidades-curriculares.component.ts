import { Component, OnInit } from '@angular/core';
import { Materia } from '../../models/materia';
import { UnidadCurricular } from '../../models/unidad-curricular';

@Component({
  selector: 'ns-abm-unidades-curriculares',
  templateUrl: './abm-unidades-curriculares.component.html',
  styleUrls: ['./abm-unidades-curriculares.component.css']
})
export class AbmUnidadesCurricularesComponent implements OnInit {
  public unidadesCurriculares: UnidadCurricular [] = [];
  public selected: UnidadCurricular = new UnidadCurricular (-1,"Programacion Avamzada","Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original.",10,1,new Materia (-1, "", "",0));
  public eleccion = "Vista";
  public materias: Materia[] = [];

  constructor() { }



  public setSelected (unidadesCurricular: UnidadCurricular): void {
    this.selected = unidadesCurricular;
    console.log(this.selected);
  }

  public setEleccion (eleccion: string): void {
    this.eleccion = eleccion;
  }

  ngOnInit(): void {
  }

}
