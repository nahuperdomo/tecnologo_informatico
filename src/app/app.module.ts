import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './core/components/login/login.component';
import { InicioComponent } from './core/components/inicio/inicio.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { CarouselComponent } from './core/components/carousel/carousel.component';
import { AbmNoticiasComponent } from './core/components/abm-noticias/abm-noticias.component';
import { NoticiasComponent } from './core/components/noticias/noticias.component';
import { VerDocumentosComponent } from './core/components/ver-documentos/ver-documentos.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './core/services/auth-interceptor.service';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    FooterComponent,
    CarouselComponent,
    AbmNoticiasComponent,
    NoticiasComponent,
    VerDocumentosComponent,
  ],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,



  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
