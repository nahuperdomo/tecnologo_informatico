import { Component, OnInit } from '@angular/core';
import { NoticiaService } from '../../services/noticia.service';
import { Noticia } from '../../models/noticia';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'ns-abm-noticias',
  templateUrl: './abm-noticias.component.html',
  styleUrls: ['./abm-noticias.component.css']
})
export class AbmNoticiasComponent implements OnInit {
  public selected :Noticia = new Noticia(-1, "", "", "", "");
  public imgen64: string = "";
  cargando = false;

  public newNoticiaForm : FormGroup = new FormGroup({
    newTitulo : new FormControl('', [Validators.required,Validators.minLength(1)]),
    newDescripcion: new FormControl('', [Validators.required, Validators.minLength(3)]),
    newFechaCaducidad: new FormControl ('',[Validators.required, Validators.minLength(1)])
  });

  constructor(private servNoticia: NoticiaService, private router: Router,private rutaActiva: ActivatedRoute) {  
    if (this.rutaActiva.snapshot.params['id']>=0) {
      this.cargando = true;
      this.servNoticia.getNoticia(this.rutaActiva.snapshot.params['id']).subscribe({
        next: value => {
          this.selected = value;
          this.newNoticiaForm.controls['newTitulo'].setValue(this.selected.titulo);
          this.newNoticiaForm.controls['newDescripcion'].setValue(this.selected.descripcion);
          this.newNoticiaForm.controls['newFechaCaducidad'].setValue(this.selected.fechaCaducidad);
          this.imgen64=this.selected.imagen;
        },
        error: err => { Swal.fire('Error al obtener la noticia: '),
                          this.router.navigate(['/']);},
        complete: () => { this.cargando = false; }
      });
    }
  }

 
  subirFoto (event: any) {
    const file = event.target.files[0];
    if(!file){
      console.log("ERROR: No se selecciono ninguna imagen");
    }
    else{
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgen64 = reader.result as string;
      }
    }
  }
  public setNoticia():void{
    if(this.newNoticiaForm.valid){
      if(this.newNoticiaForm.controls['newFechaCaducidad'].value!=""){
        this.selected.fechaCaducidad=this.newNoticiaForm.controls['newFechaCaducidad'].value;
      }
      if(this.imgen64!=""){
        this.selected.imagen=this.imgen64;
      }
      this.selected.titulo=this.newNoticiaForm.controls['newTitulo'].value;
      this.selected.descripcion=this.newNoticiaForm.controls['newDescripcion'].value;
      this.cargando = true;
      this.servNoticia.updateNoticia(this.selected).subscribe({
        next: value => {let id = value.id;
                          Swal.fire("Noticia Modificada")
                          this.newNoticiaForm.reset();
                          this.router.navigate(['/noticias/'+id]);
                        },
        error: err => { Swal.fire('Error al actualizar: ') },
        complete: () => { this.cargando = false; }
      });
    }
  }
   
  public nuevaNoticia (){
    if(this.newNoticiaForm.valid && this.imgen64!=""){
      this.selected = new Noticia (0, this.newNoticiaForm.controls['newTitulo'].value, this.newNoticiaForm.controls['newDescripcion'].value,this.imgen64, this.newNoticiaForm.controls['newFechaCaducidad'].value);
      this.cargando = true;
      this.servNoticia.newNoticia(this.selected).subscribe({
        next: value => {let id = value.id;
                        Swal.fire("NOTICIA CREADA")
                        this.newNoticiaForm.reset();
                        this.router.navigate(['/noticias/'+id]);

                      },
        error: err => { Swal.fire('Error al agregar la noticia: '),
                    this.router.navigate(['/']);},
        complete: () => { this.cargando = false; }
        
      });
      this.newNoticiaForm.reset();
      
    }else{
      Swal.fire('Error al agregar la noticia, revise los campos');
    }
  }

  ngOnInit(): void {
  }

}
