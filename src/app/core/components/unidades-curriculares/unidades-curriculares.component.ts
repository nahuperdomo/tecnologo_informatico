import { Component, OnInit, Output } from '@angular/core';
import { Materia } from '../../models/materia';
import { UnidadCurricular } from '../../models/unidad-curricular';
import {UnidadesCurricularesService} from '../../services/unidades-curriculares.service';
import { CargandoComponent } from '../cargando/cargando.component';


@Component({
  selector: 'ns-unidades-curriculares',
  templateUrl: './unidades-curriculares.component.html',
  styleUrls: ['./unidades-curriculares.component.css']
})
export class UnidadesCurricularesComponent implements OnInit {

public items = ['SEMESTRE 1', 'SEMESTRE 2', 'SEMESTRE 3', 'SEMESTRE 4', 'SEMESTRE 5', 'SEMESTRE 6'];

public  expandedIndex = 0;
public unidadesCurriculares: UnidadCurricular[] = [];
public cargando = true;

constructor(private servUnidad: UnidadesCurricularesService) {}

con(item :string){
  console.log(item);
}


  ngOnInit(): void {
    this.servUnidad.getUnidadesCurriculares().subscribe({
      next: value => { console.log(value),
                  this.unidadesCurriculares=value},
      error: err => { alert('Error al cargar las unidades: ' + err) },
      complete: () => { this.cargando = false }
    });
  }
}
