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
    
     
      
      this.servDocumento.newDocumento(this.selected).subscribe({
        next: value =>  {let id = value.id;

                         Swal.fire('Documento creado')
                          this.newDocumentoForm.reset();
                          this.router.navigate(['/documentos/']);
                          

                        },
        error: err => {Swal.fire('Error al crear documento: ') }
      });
    }
  }

  subirPDF (event: any) {
    const file = event.target.files[0];
    if(!file){
      Swal.fire('Error al subir el archivo, falta el PDF ', '', 'error');
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