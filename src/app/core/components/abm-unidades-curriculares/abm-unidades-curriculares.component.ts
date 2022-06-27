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
  public selected: UnidadCurricular = new UnidadCurricular (-1,"","",0,new Materia (-1, "", "",0));
  public eleccion = "Vista";

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
