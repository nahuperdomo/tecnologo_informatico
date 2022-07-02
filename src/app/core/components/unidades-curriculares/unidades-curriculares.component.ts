import { Component, OnInit, Output } from '@angular/core';
import { Materia } from '../../models/materia';
import { UnidadCurricular } from '../../models/unidad-curricular';
import {UnidadesCurricularesService} from '../../services/unidades-curriculares.service';


@Component({
  selector: 'ns-unidades-curriculares',
  templateUrl: './unidades-curriculares.component.html',
  styleUrls: ['./unidades-curriculares.component.css']
})
export class UnidadesCurricularesComponent implements OnInit {

public items = ['SEMESTRE 1', 'SEMESTRE 2', 'SEMESTRE 3', 'SEMESTRE 4', 'SEMESTRE 5', 'SEMESTRE 6'];
public  expandedIndex = 0;
public unidadSemestral: any[] = [];
public unidadesCurriculares: UnidadCurricular[] = [];


/*
@Output() public selected: UnidadCurricular = new UnidadCurricular(-1,"","",0,0,new Materia(-1,"","",0));
*/

  constructor(private servUnidad: UnidadesCurricularesService) {}

  
  public filtradoPorSemestre(unidades : UnidadCurricular[]): void {
    this.unidadSemestral[0]=this.unidadesCurriculares.filter(unidad => unidad.semestre == 1);
    this.unidadSemestral[1]=this.unidadesCurriculares.filter(unidad => unidad.semestre == 2);
    this.unidadSemestral[2]=this.unidadesCurriculares.filter(unidad => unidad.semestre == 3);
    this.unidadSemestral[3]=this.unidadesCurriculares.filter(unidad => unidad.semestre == 4);
    this.unidadSemestral[4]=this.unidadesCurriculares.filter(unidad => unidad.semestre == 5);
    this.unidadSemestral[5]=this.unidadesCurriculares.filter(unidad => unidad.semestre == 6);
  }



  ngOnInit(): void {
    this.servUnidad.getUnidadesCurriculares().subscribe({
      next: value => { console.log(value),
                    this.filtradoPorSemestre(value)},
      error: err => { alert('Error al cargar las unidades: ' + err) }
    });
  }



}
