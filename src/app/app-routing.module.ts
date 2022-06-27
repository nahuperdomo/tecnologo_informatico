import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{LoginComponent} from '../app/core/components/login/login.component';
import {ToolbarComponent} from '../app/core/components/toolbar/toolbar.component';
import { InicioComponent } from './core/components/inicio/inicio.component';
import { AbmNoticiasComponent } from './core/components/abm-noticias/abm-noticias.component';
import { NoticiasComponent } from './core/components/noticias/noticias.component';
import { AbmMateriasComponent } from './core/components/abm-materias/abm-materias.component';
import { AbmUnidadesCurricularesComponent } from './core/components/abm-unidades-curriculares/abm-unidades-curriculares.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent } ,
   { path: 'hola', component: ToolbarComponent } , 
  { path: '', component:InicioComponent },
  { path: 'abm-noticias', component: AbmNoticiasComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'abm-materias', component: AbmMateriasComponent },
  { path: 'abm-u-c', component: AbmUnidadesCurricularesComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
