import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{LoginComponent} from '../app/core/components/login/login.component';
import {ToolbarComponent} from '../app/core/components/toolbar/toolbar.component';
import { InicioComponent } from './core/components/inicio/inicio.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent } ,
   { path: 'hola', component: ToolbarComponent } , 
  { path: '', component:InicioComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
