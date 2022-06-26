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
import  {MatInputModule} from '@angular/material/input';
import { AbmNoticiasComponent } from './components/abm-noticias/abm-noticias.component';
/**/ 
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';







/* import { MatCarouselModule } from '@ngmodule/material-carousel';
 */


@NgModule({
  declarations: [
    ToolbarComponent,


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




  ]
})
export class CoreModule { }
