import { Component, Input, OnInit } from '@angular/core';
import { UnidadesCurricularesComponent } from '../unidades-curriculares/unidades-curriculares.component';
import { UnidadCurricular } from '../../models/unidad-curricular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CargandoComponent } from '../cargando/cargando.component';
import { UnidadesCurricularesService} from '../../services/unidades-curriculares.service';
import { Materia } from '../../models/materia';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ns-ver-unidad',
  templateUrl: './ver-unidad.component.html',
  styleUrls: ['./ver-unidad.component.css']
})
export class VerUnidadComponent implements OnInit {
  
  public unidad = new UnidadCurricular(-1,"","",0,"",0,new Materia(-1,"","",0));
  public cargando = true;
  public eleccion = "Vista";
  public pdf = "";

  constructor(private rutaActiva: ActivatedRoute, private servUnidadesCurriculares: UnidadesCurricularesService, private router: Router, private san: DomSanitizer) { 
   }

   public deleteUnidad(){
    this.cargando = true;
    this.servUnidadesCurriculares.deleteUnidadCurricular(this.unidad.id).subscribe({
      next: value => {Swal.fire('Unidad eliminada'),
                      this.router.navigate(['/unidades-curriculares'])},
      error: err => { Swal.fire('Error al eliminar la unidad curricular: ' + err)},
      complete: () => { this.cargando = false }
    });
  }
  public setEleccion(eleccion: string){
    if(eleccion=="Vista"){
      this.eleccion = "Vista";
      this.ngOnInit();
    }
    this.eleccion = eleccion;
  }
  public verPDF(docPDF:string){
    this.eleccion = "PDF"
    this.pdf=docPDF;
   

  }
  public PDF(pdf: string){
    return this.san.bypassSecurityTrustResourceUrl(pdf);
  }
  
    ngOnInit(): void {
      let id  = this.rutaActiva.snapshot.params['id'];
      this.servUnidadesCurriculares.getUnidadCurricular(id).subscribe({
        next: value => {
          this.unidad = value;
        },
        error: err => { Swal.fire('Error al cargar las noticias: ' + err)},
        complete: () => {this.cargando = false;}
      });
  }

}
