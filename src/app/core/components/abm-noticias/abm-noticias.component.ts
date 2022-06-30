import { Component, OnInit } from '@angular/core';
import { NoticiaService } from '../../services/noticia.service';
import { Noticia } from '../../models/noticia';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'ns-abm-noticias',
  templateUrl: './abm-noticias.component.html',
  styleUrls: ['./abm-noticias.component.css']
})
export class AbmNoticiasComponent implements OnInit {
  public selected :Noticia = new Noticia(-1, "", "", "", "");
  public eleccion = "Vista";
  public noticias : Noticia[] = [];
  public imgen64: string = "";

  public newNoticiaForm : FormGroup = new FormGroup({
    newTitulo : new FormControl('', [Validators.required,Validators.minLength(1)]),
    newDescripcion: new FormControl('', [Validators.required, Validators.minLength(3)]),
    newFechaCaducidad: new FormControl ('',[Validators.required, Validators.minLength(1)])
  });

  constructor(private servNoticia: NoticiaService) {  }

  public setEleccion (eleccion: string): void {
    this.eleccion = eleccion;
  }

  public setSelected (noticia: Noticia): void {
    this.selected = noticia;
    console.log(this.selected);
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

  public setNoticia(titulo:string, descripcion:string,fecha:string): void {
    if(titulo!="" && descripcion!=""){
      if(fecha!=""){
        this.selected.fechaCaducidad=fecha;
      }
      if (this.imgen64!=""){
        this.selected.imagen=this.imgen64;
      }
      this.selected.titulo=titulo;
      this.selected.descripcion=descripcion;
      this.servNoticia.updateNoticia(this.selected).subscribe({
        next: value => this.selected = value,
        error: err => { alert('Error al actualizar: ') }
      });
      this.getAllNoticias();
      this.ngOnInit();
    }else{
      alert("Todos los campos son obligatorios");
    }
  }
  
  public nuevaNoticia (){
    if(this.newNoticiaForm.valid && this.imgen64!=""){
      this.selected = new Noticia (0, this.newNoticiaForm.controls['newTitulo'].value, this.newNoticiaForm.controls['newDescripcion'].value,this.imgen64, this.newNoticiaForm.controls['newFechaCaducidad'].value);
      this.servNoticia.newNoticia(this.selected).subscribe({
        next: value => this.selected = value,
        error: err => { alert('Error al cargar las noticias: ') }
      });
      this.getAllNoticias();
      this.ngOnInit();
    }else{
      alert('Error al agregar la noticia, revise los campos');
    }
  }

  public deleteNoticia (){
    this.servNoticia.deleteNoticia(this.selected.id).subscribe({

      error: err => { alert('Error al eliminar la noticia: ') }
    });
    this.getAllNoticias();
    this.ngOnInit();
    this.selected.id=-1;
  }


  public getAllNoticias(): void {
    this.servNoticia.getNoticias(1,200).subscribe({
      next: value => this.noticias = value.list,
      error: err => { alert('Error al cargar las noticias: ' + err) }
    });
  }
  
  ngOnInit(): void {
     this.getAllNoticias();
     this.imgen64 = "";
     this.setEleccion ("Vista");
  }

}
