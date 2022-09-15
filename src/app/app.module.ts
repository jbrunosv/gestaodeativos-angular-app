import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TemplateModule } from './template/template.module';
import { HomeComponent } from './home/home.component'
import { UsuariosModule } from './usuarios/usuarios.module';
import { UsuariosService } from './usuarios.service';
import { ItensModule } from './itens/itens.module';
import { ItensService } from './itens.service';
import { LocaisModule } from './locais/locais.module';
import { LocaisService } from './locais.service';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';

import {LOCALE_ID, DEFAULT_CURRENCY_CODE} from '@angular/core';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TemplateModule,
    UsuariosModule,
    ItensModule,
    LocaisModule
  ],
  providers: [
    UsuariosService,
    ItensService,
    LocaisService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
