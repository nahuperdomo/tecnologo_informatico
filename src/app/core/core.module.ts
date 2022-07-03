import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule} from  '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from '../app-routing.module';
import{MatInputModule} from '@angular/material/input';
import { AbmDocumentosComponent } from './components/abm-documentos/abm-documentos.component';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { AbmUnidadesCurricularesComponent } from './components/abm-unidades-curriculares/abm-unidades-curriculares.component';
import { AbmMateriasComponent } from './components/abm-materias/abm-materias.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ContactoComponent } from './components/contacto/contacto.component';
import { UnidadesCurricularesComponent } from './components/unidades-curriculares/unidades-curriculares.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { VerUnidadComponent } from './components/ver-unidad/ver-unidad.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { CargandoComponent } from './components/cargando/cargando.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { VerNoticiaComponent } from './components/ver-noticia/ver-noticia.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';



@NgModule({
  declarations: [
    ToolbarComponent,
    AbmDocumentosComponent,
    AbmUnidadesCurricularesComponent,
    AbmMateriasComponent,
    ContactoComponent,
    UnidadesCurricularesComponent,
    VerUnidadComponent,
    CargandoComponent,
    VerNoticiaComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    HttpClientModule,
    MatTabsModule,
    ScrollingModule,
    MatPaginatorModule,
    CdkAccordionModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatSlideToggleModule


    

    
  ],
  exports:[
    ToolbarComponent,
    FlexLayoutModule,
    MatFormFieldModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatCardModule,
    MatTabsModule,
    ScrollingModule,
    MatPaginatorModule,
    CdkAccordionModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    CargandoComponent,
    MatAutocompleteModule,
    MatSlideToggleModule



  ]
})
export class CoreModule { }
