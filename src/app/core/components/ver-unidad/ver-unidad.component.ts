import { Component, Input, OnInit } from '@angular/core';
import { UnidadesCurricularesComponent } from '../unidades-curriculares/unidades-curriculares.component';
import { UnidadCurricular } from '../../models/unidad-curricular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {UnidadesCurricularesService} from '../../services/unidades-curriculares.service';

@Component({
  selector: 'ns-ver-unidad',
  templateUrl: './ver-unidad.component.html',
  styleUrls: ['./ver-unidad.component.css']
})
export class VerUnidadComponent implements OnInit {
  
  public unidad: any;
  public cargando = true;

  constructor(private rutaActiva: ActivatedRoute, private servUnidadesCurriculares: UnidadesCurricularesService, private router: Router) { 
   

}
    ngOnInit(): void {
      let id  = this.rutaActiva.snapshot.params['id'];
      this.servUnidadesCurriculares.getUnidadCurricular(id).subscribe({
        next: value => {
          this.unidad = value;
        },
        error: err => { alert('Error al cargar las noticias: ' + err)},
        complete: () => {this.cargando = false;}
      });
  }

}
