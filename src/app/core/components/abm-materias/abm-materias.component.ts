import { Component, OnInit } from '@angular/core';
import { Materia } from '../../models/materia';
import { MateriaService } from '../../services/materia.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'ns-abm-materias',
  templateUrl: './abm-materias.component.html',
  styleUrls: ['./abm-materias.component.css']
})
export class AbmMateriasComponent implements OnInit {

  public eleccion = "Vista";
  public selected: Materia;
  public materias: Materia[] = [];
  cargando = true;

  constructor(private servMateria: MateriaService) { 
    this.selected= new Materia(-1, "", "",0);
  }

  public newMateriaForm : FormGroup = new FormGroup({
    newNombre : new FormControl('', [Validators.required,Validators.minLength(1)]),
    newDescripcion: new FormControl('', [Validators.required, Validators.minLength(3)]),
    newCreditosMinimos: new FormControl ('',[Validators.required, Validators.min(0)])
  });


  public setEleccion (eleccion: string): void {
    if(eleccion=="Modificar"){
      this.newMateriaForm.controls['newNombre'].setValue(this.selected.nombre);
      this.newMateriaForm.controls['newDescripcion'].setValue(this.selected.descripcion);
      this.newMateriaForm.controls['newCreditosMinimos'].setValue(this.selected.creditosMinimos);
    }
    if(eleccion =="Nuevo"){
      this.newMateriaForm.controls['newNombre'].setValue("");
      this.newMateriaForm.controls['newDescripcion'].setValue("");
      this.newMateriaForm.controls['newCreditosMinimos'].setValue("");
    }
    this.eleccion = eleccion;      
  }

  public setSelected (materia: Materia): void {
    this.selected = materia;
    console.log(this.selected);
  }

  public newMateria(): void {
    if(this.newMateriaForm.valid){
      let nuevaMateria = new Materia(0, this.newMateriaForm.value.newNombre, this.newMateriaForm.value.newDescripcion, this.newMateriaForm.value.newCreditosMinimos);
      this.servMateria.newMateria(nuevaMateria).subscribe({
        next: value => this.selected = value,
        error: err => { alert('Error al crear la materia: ' + err) }
    });
    this.ngOnInit();
    }else{
      alert("Falla! Revise que tenga todos los campos");
    }	
  }
  

  public setMateria(): void {
    if(this.newMateriaForm.valid){
      let nuevaMateria = new Materia(this.selected.id, this.newMateriaForm.value.newNombre, this.newMateriaForm.value.newDescripcion, this.newMateriaForm.value.newCreditosMinimos);
      this.servMateria.updateMateria(nuevaMateria).subscribe({
        next: value => this.selected = value,
        error: err => { alert('Error al crear la materia: ' + err) },
    });
    this.ngOnInit();
    }else{
      alert("Falla! Revise que tenga todos los campos");
    }
  }

  public deleteMateria(): void {
    this.servMateria.deleteMateria(this.selected.id).subscribe({
        error: err => { alert('Error al eliminar la materia: ' + err) }
    });
    this.setSelected(new Materia(-1, "", "", 0));
    this.selected = new Materia(-1, "", "",0);
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.cargando= true;
    this.servMateria.getMaterias().subscribe({
      next: value => this.materias = value,
      error: err => { alert('Error al cargar las materias: ' + err) },
      complete: () => { this.cargando = false; }
    });
    this.eleccion = "Vista";
  }
}
