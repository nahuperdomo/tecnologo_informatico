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
/* import { MatCarouselModule } from '@ngmodule/material-carousel';
 */


@NgModule({
  declarations: [
    ToolbarComponent,
    AbmDocumentosComponent
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
    MatInputModule
    
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
  ]
})
export class CoreModule { }
