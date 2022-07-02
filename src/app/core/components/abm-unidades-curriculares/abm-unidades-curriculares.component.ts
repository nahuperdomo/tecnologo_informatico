import { Component, OnInit } from '@angular/core';
import { Materia } from '../../models/materia';
import { UnidadCurricular } from '../../models/unidad-curricular';
import {UnidadesCurricularesService} from '../../services/unidades-curriculares.service';
import { MateriaService } from '../../services/materia.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {Previatura} from '../../models/previatura';


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
  public cargando = true;
  public previas: UnidadCurricular[] = [];
  public previaturas: Previatura[] = [];


  


  public newUnidadForm : FormGroup = new FormGroup({
    newNombre : new FormControl('', [Validators.required,Validators.minLength(3)]),
    newDescripcion: new FormControl('', [Validators.required]),
    newCreditos: new FormControl('', [Validators.required]),
    newSemestre: new FormControl ('',[Validators.required]),
    newMateria : new FormControl ('',[Validators.required]),
    newPrevias : new FormControl ('')
  });

  constructor(private router: Router, private servUnidadesCurriculares : UnidadesCurricularesService, private servMateria : MateriaService  ) { }

  public nuevaUnidad (){
    if(this.newUnidadForm.valid){
      let materia  = this.materias.find(m => m.id == this.newUnidadForm.controls['newMateria'].value)!;
      this.previas[0] = new UnidadCurricular(0,"Proo","ddddd",0, 1, this.materias[0], this.previaturas );
      this.servUnidadesCurriculares.newUnidadCurricular(this.previas[0]).subscribe({
        next: value => { console.log("bien"); },
        error: err => { alert('Error al crear la unidad curricular: ' + err) },
      });
      console.log("hola");
    }
    
  }

  public setSelected (unidadesCurricular: UnidadCurricular): void {
    this.selected = unidadesCurricular;
    console.log(this.selected);
  }

  public setEleccion (eleccion: string): void {
    this.eleccion = eleccion;
  }

  ngOnInit(): void {
   this.servUnidadesCurriculares.getUnidadesCurriculares( ).subscribe({
      next: value => this.previas = value,
      error: err => { alert('Error al cargar las materias: ' + err) },
      complete: () => { this.cargando = false; }
    });
    this.servMateria.getMaterias().subscribe({
      next: value => this.materias = value,
      error: err => { alert('Error al cargar las Materias' + err.message), 
                      this.router.navigate(['/abm-materias']);},
      complete: () => { this.cargando = false; }
    });

    /*if(this.materias.length == 0){
      alert ('Primero tiene que crear una MATERIA');
      this.router.navigate (['/abm-materias']);
    }*/
    this.newUnidadForm.controls['newSemestre'].setValue('1');

  }
}

