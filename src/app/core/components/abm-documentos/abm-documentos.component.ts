import { Component, OnInit } from '@angular/core';
import { Documento } from '../../models/documento';
import { DocumentoPagedListResponse } from '../../models/documento-paged-list-response';
import { DocumentoService } from '../../services/documento.service';
import { MatOption } from '@angular/material/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'ns-abm-documentos',
  templateUrl: './abm-documentos.component.html',
  styleUrls: ['./abm-documentos.component.css']
})
export class AbmDocumentosComponent implements OnInit {
  public newDocumentoForm : FormGroup = new FormGroup({
    newTitulo : new FormControl('', [Validators.required,Validators.minLength(1)]),
    newEstado : new FormControl(''),
    newTipo : new FormControl(''),
  });
  
  public selected :Documento = new Documento(0, "Documento1", "Programacion", "soyunpdf", true);
  public eleccion = "Vista";
  public documentos : Documento[] = [];
  public pdf64 = "";

  constructor(private servDocumento: DocumentoService,  private router: Router) { }

  public setEleccion (eleccion: string): void {
    this.eleccion = eleccion;
  }

  public setSelected (documento: Documento): void {
    this.selected = documento;
    console.log(this.selected);
  }

  public newDocumento():void{
    if(this.newDocumentoForm.valid && this.pdf64.length > 0){
      this.selected.titulo=this.newDocumentoForm.controls['newTitulo'].value;
      this.selected.tipo=this.newDocumentoForm.controls['newTipo'].value;
      this.selected.activo=this.newDocumentoForm.controls['newEstado'].value;
      this.selected.documentoPDF = this.pdf64;
      if(this.newDocumentoForm.controls['newEstado'].value=="true"){
        this.selected.activo=true;
      } else {
        this.selected.activo=false;
      }
    
      console.log(this.selected.activo);
      console.log(this.selected);
      this.servDocumento.newDocumento(this.selected).subscribe({
        next: value =>  {let id = value.id;

                         Swal.fire('Noticia Modificada')
                          this.newDocumentoForm.reset();
                          this.router.navigate(['/documentos/']);
                          

                        },
        error: err => {Swal.fire('Error al crear documento: ') }
      });
    }
  }
/* por si lo necesitamos
  modificar(){
    this.selected.titulo = "Tablas de inportancia, todos los estudiantes descarguen";
    this.selected.tipo = "INFORMACION_CARRERA";
    this.selected.documentoPDF = this.pdf64;
    this.selected.activo = true;
    this.selected.id = 6;
    this.servDocumento.updateDocumento(this.selected.id,this.selected).subscribe({
      next: value =>  {let id = value.id;
                        alert("Documento Modificada")
                        this.router.navigate(['/documentos/']);
                      },
      error: err => { alert('Error al modificar documento: ' + err) }
    });
  }
*/
  subirPDF (event: any) {
    const file = event.target.files[0];
    if(!file){
      console.log("ERROR: No se selecciono ninguna imagen");
    }
    else{
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.pdf64 = reader.result as string;
      }
    }
  }

  ngOnInit(): void {

  }


}