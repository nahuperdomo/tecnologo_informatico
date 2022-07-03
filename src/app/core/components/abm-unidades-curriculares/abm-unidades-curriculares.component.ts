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
  public selected: UnidadCurricular = new UnidadCurricular (-1,"","",0,"",0,new Materia (-1, "", "",0));
  public eleccion = "Vista";
  public materias: Materia[] = [];
  public cargando = true;
  public previas: UnidadCurricular[] = [];

  


  public newUnidadForm : FormGroup = new FormGroup({
    newNombre : new FormControl('', [Validators.required,Validators.minLength(3)]),
    newDescripcion: new FormControl('', [Validators.required]),
    newCreditos: new FormControl('', [Validators.required]),
    newSemestre: new FormControl ('',[Validators.required]),
    newMateria : new FormControl ('',[Validators.required]),
    newPrevias : new FormControl ('')
  });
  public doc64 = "";

  constructor(private router: Router, private servUnidadesCurriculares : UnidadesCurricularesService, private servMateria : MateriaService  ) { }

  public nuevaUnidad (){
    console.log(this.doc64);
    if(this.newUnidadForm.valid && this.doc64 != ""){
        let idMateria = parseInt(this.newUnidadForm.controls['newMateria'].value);

        let materia = this.materias.find(materia => materia.id == idMateria)!;
        this.selected= new UnidadCurricular (0,
        this.newUnidadForm.controls['newNombre'].value,
        this.newUnidadForm.controls['newDescripcion'].value,
        parseInt(this.newUnidadForm.controls['newCreditos'].value),
        "",        
        parseInt(this.newUnidadForm.controls['newSemestre'].value),
        materia
        );
  
        this.mostrarTodo();
        console.log(materia);
        this.servUnidadesCurriculares.newUnidadCurricular(this.selected).subscribe({
        next: value => { console.log("bien"); },
        error: err => { alert('Error al crear la unidad curricular: ') },
      });
      console.log("hola");
    }else{
      alert ("Complete todos los campos");
    }
  }
  public mostrarTodo(): void {
    console.log(this.selected);
    console.log (this.newUnidadForm.controls['newMateria'].value);     
    
  }

  subirDocumento (event: any) {
    const file = event.target.files[0];
    if(!file){
      console.log("ERROR: No se selecciono ningun documento");
    }
    else{
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.doc64 = reader.result as string;
      }
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

