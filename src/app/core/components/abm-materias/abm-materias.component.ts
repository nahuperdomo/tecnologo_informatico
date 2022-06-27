import { Component, OnInit } from '@angular/core';
import { Materia } from '../../models/materia';
import { MateriaService } from '../../services/materia.service';


@Component({
  selector: 'ns-abm-materias',
  templateUrl: './abm-materias.component.html',
  styleUrls: ['./abm-materias.component.css']
})
export class AbmMateriasComponent implements OnInit {

  public eleccion = "Vista";
  public selected: Materia;
  public materias: Materia[] = [];

  constructor(private servMateria: MateriaService) { 
    this.selected= new Materia(21, "Redes e Internet Ricas", "En este curos aprenderas mucho lo que tiene que ver con el Frontend en las paginas web, asi como angular y a implementar Freamworck",30);
  }

  public setEleccion (eleccion: string): void {
    this.eleccion = eleccion;
  }

  public setSelected (materia: Materia): void {
    this.selected = materia;
    console.log(this.selected);
  }

  ngOnInit(): void {
    this.servMateria.getMaterias().subscribe({
      next: value => this.materias = value,
      error: err => { alert('Error al cargar las materias: ' + err) }
    });

  }

}
