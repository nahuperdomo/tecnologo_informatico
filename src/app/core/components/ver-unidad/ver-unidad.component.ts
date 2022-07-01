import { Component, Input, OnInit } from '@angular/core';
import { UnidadesCurricularesComponent } from '../unidades-curriculares/unidades-curriculares.component';
import { UnidadCurricular } from '../../models/unidad-curricular';

@Component({
  selector: 'ns-ver-unidad',
  templateUrl: './ver-unidad.component.html',
  styleUrls: ['./ver-unidad.component.css']
})
export class VerUnidadComponent implements OnInit {
  @Input() unidad: any;
  constructor() { }

  ngOnInit(): void {
  }

}
