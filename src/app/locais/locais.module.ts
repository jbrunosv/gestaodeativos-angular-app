import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LocaisRoutingModule } from './locais-routing.module';
import { LocaisFormComponent } from './locais-form/locais-form.component';
import { LocaisListaComponent } from './locais-lista/locais-lista.component';


@NgModule({
  declarations: [
    LocaisFormComponent, 
    LocaisListaComponent
  ],
  imports: [
    CommonModule,
    LocaisRoutingModule,
    FormsModule
  ],
  exports: [
    LocaisFormComponent,
    LocaisListaComponent
  ]
})
export class LocaisModule { }
