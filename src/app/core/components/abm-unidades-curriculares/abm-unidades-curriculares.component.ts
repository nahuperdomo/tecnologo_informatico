import { Component, OnInit } from '@angular/core';
import { Materia } from '../../models/materia';
import { UnidadCurricular } from '../../models/unidad-curricular';
import {UnidadesCurricularesService} from '../../services/unidades-curriculares.service';
import { MateriaService } from '../../services/materia.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {Previatura} from '../../models/previatura';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'ns-abm-unidades-curriculares',
  templateUrl: './abm-unidades-curriculares.component.html',
  styleUrls: ['./abm-unidades-curriculares.component.css']
})
export class AbmUnidadesCurricularesComponent implements OnInit {
  public unidadesCurriculares: UnidadCurricular [] = [];
  public selected: UnidadCurricular = new UnidadCurricular (-1,"","",0,"",0,new Materia (-1, "", "",0));
  public eleccion = "Nuevo";
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

  constructor(private router: Router,private rutaActiva: ActivatedRoute , private servUnidadesCurriculares : UnidadesCurricularesService, private servMateria : MateriaService) {
      if(this.rutaActiva.snapshot.params['id'] >= 0){
        this.cargando = true;
        this.servUnidadesCurriculares.getUnidadCurricular(this.rutaActiva.snapshot.params['id']).subscribe({
        next: value => {this.selected = value,
                        this.newUnidadForm.controls['newNombre'].setValue(this.selected.nombre),
                        this.newUnidadForm.controls['newDescripcion'].setValue(this.selected.descripcion),
                        this.newUnidadForm.controls['newCreditos'].setValue(this.selected.creditos),
                        this.newUnidadForm.controls['newSemestre'].setValue(""+this.selected.semestre),
                        this.newUnidadForm.controls['newMateria'].setValue(this.selected.materia.id),
                        this.doc64 = this.selected.documento},
        error: err => { alert('Error al cargar la unidad curricular: ' + err),
                        this.router.navigate(['/unidad/'+this.rutaActiva.snapshot.params['id']])},
        complete: () => { this.cargando = false }
      });
      this.eleccion="Modificar";
      console.log(this.selected);
    }
   }


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
        this.cargando = true;
        this.servUnidadesCurriculares.newUnidadCurricular(this.selected).subscribe({
        next: value => { alert('Unidad curricular creada con éxito'),
                        this.selected = value,
                        this.router.navigate(['/unidad/'+this.selected.id])},
        error: err => { alert('Error al crear la unidad curricular: ') },
        complete: () => { this.cargando = false }
      });
    }else{
      alert ("Complete todos los campos");
    }
  }

  public modificarUnidad (){
    if(this.newUnidadForm.valid){
      if(this.doc64 != ""){
        this.selected.documento = this.doc64;
      }
      if(this.newUnidadForm.controls['newMateria'].value){
        let idMateria = parseInt(this.newUnidadForm.controls['newMateria'].value);
        let materia = this.materias.find(materia => materia.id == idMateria)!;
      }
      this.selected.nombre = this.newUnidadForm.controls['newNombre'].value;
      this.selected.descripcion = this.newUnidadForm.controls['newDescripcion'].value;
      this.selected.creditos = parseInt(this.newUnidadForm.controls['newCreditos'].value);
      this.selected.semestre = parseInt(this.newUnidadForm.controls['newSemestre'].value);
      this.servUnidadesCurriculares.updateUnidadCurricular(this.selected).subscribe({
        next: value => { alert ("Unidad curricular modificada") 
                        this.router.navigate(['/unidad/'+this.selected.id]); },
        error: err => { alert('Error al modificar la unidad curricular: ') },
      });
    }else{
      alert ("Complete todos los campos");
    }
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

    this.newUnidadForm.controls['newSemestre'].setValue('1');

  }
}

