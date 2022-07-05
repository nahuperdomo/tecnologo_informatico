import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Previatura } from '../../models/previatura';
import { UnidadCurricular } from '../../models/unidad-curricular';
import { Materia } from '../../models/materia';
import { MateriaService } from '../../services/materia.service';
import { UnidadesCurricularesService } from '../../services/unidades-curriculares.service';
import { PreviasService } from '../../services/previas.service';

@Component({
  selector: 'ns-previas',
  templateUrl: './previas.component.html',
  styleUrls: ['./previas.component.css']
})
export class PreviasComponent implements OnInit {
  public cargando = true;
  public previa: Previatura[] = [];
  public unidad : UnidadCurricular = new UnidadCurricular (-1,"","",0,"",0,new Materia (-1, "", "",0));
  public eleccion ="Vista";

  public unidades : UnidadCurricular[] = [];

  constructor(private router: Router,private rutaActiva: ActivatedRoute , private servUnidadesCurriculares : UnidadesCurricularesService, private servMateria : MateriaService, private servPrevias : PreviasService) {

    
      let valor;
      this.cargando = true;
      this.servUnidadesCurriculares.getUnidadCurricular(this.rutaActiva.snapshot.params['id']).subscribe({
      next: value => {this.previa = value.previas
                      this.unidad = value},
                      error: err => { alert('Error al cargar la unidad curricular: ' + err),
                      this.router.navigate(['/unidad/'+this.rutaActiva.snapshot.params['id']])},
      complete: () => { this.cargando = false },
    });
    //si semestre es igual a 1 redireccionar a unidad con id
    if(this.unidad.semestre == 1){
      this.router.navigate(['/unidad/'+this.unidad.id]);
    }
   }
   
   public eliminarPrevia(idPrevia:number){
    this.eleccion=="Vista";
    this.cargando = true;
    this.servPrevias.deletePrevia(idPrevia).subscribe({
      next: value => {this.unidad.previas = this.unidad.previas.filter(previa => previa.id != idPrevia),
                      this.ngOnInit();
                      console.log(this.unidad)},
        
      error: err => { alert('Error al eliminar la previa: ' + err)},
      complete: () => { this.cargando = false }
    });

  }
   
  
  public crearPrevia(previa:string, tipo:string){
       
    if(previa != "" && tipo != ""){
      this.cargando==true;
      this.eleccion=="Vista";
      this.servPrevias.agregarPrevia(this.unidad.id, parseInt(previa), tipo).subscribe({
      next: value => {this.unidad.previas.push(value),
                      console.log(this.unidad),
                      this.ngOnInit();},
                      error: err => { alert('Error al crear la previa: ' + err)},
      complete: () => { this.cargando = false,
                      this.eleccion=="Vista" },
    });
    }else{
      alert("Debe seleccionar todos los campos")
    }
  }

   setEleccion(eleccion:string){
    this.eleccion = eleccion;
  }

  ngOnInit(): void {
    this.eleccion=="Vista";
    this.cargando = true;
    this.servUnidadesCurriculares.getUnidadesCurriculares( ).subscribe({
      next: value => {this.unidades = this.filtroUnidades(value) },
      error: err => { alert('Error al cargar las materias: ' + err) },
      complete: () => { this.cargando= false }
    });
   
  }
  public filtroUnidades(uni:UnidadCurricular[]):UnidadCurricular[] {
    uni = uni.filter(uni => uni.id != this.unidad.id);
    if(this.unidad.semestre != -1) {
      uni = uni.filter(uni => uni.semestre < this.unidad.semestre);
    }
    for(let i = 0; i < this.unidad.previas.length; i++) {
      uni = uni.filter(uni => uni.id != this.unidad.previas[i].previa.id);
    }
    console.log(uni);
    return uni;
  }
}
