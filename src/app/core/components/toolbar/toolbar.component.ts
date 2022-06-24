import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ns-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  public opciones = 1;
  constructor() { }
  ngOnInit(): void {
  }

  mostrarMenu():void{
    if(this.opciones==1){
      this.opciones=0;
    }else{
      this.opciones=1;
    }
  }
}
