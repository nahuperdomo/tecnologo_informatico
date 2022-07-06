import { Component, OnInit } from '@angular/core';
import { MenuMobileComponent } from '../menu-mobile/menu-mobile.component';
import { Router } from '@angular/router';
import { switchAll } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'ns-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  public opciones = 1;
  public menu = 0;
  public session: boolean;
  public localStorage = localStorage;
  router: any;
  constructor() { 
    if(localStorage.getItem("token")==null){
      this.session=false;
    }else{
      this.session=true;
    }
  }
  
  ngOnInit(): void {
  }

  mostrarMenu():void{
    if(this.opciones==1){
      this.opciones=0;
    }else{
      this.opciones=1;
    }
    
  }

  mostrarOpciones():void{
      if(this.menu==1){
        this.menu=0;
      }else{
        this.menu=1;
      }
  }

  cerrarSesion(){
    localStorage.removeItem("token");
    this.session=false;
    Swal.fire(
      'Sesion cerrada con exito',
      'Nos vemos pronto !! ',
      'success'
    )
    this.router.navigate(['']);
  }

}

