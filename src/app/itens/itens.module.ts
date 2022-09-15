import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ItensRoutingModule } from './itens-routing.module';
import { ItensFormComponent } from './itens-form/itens-form.component';
import { ItensListaComponent } from './itens-lista/itens-lista.component';


@NgModule({
  declarations: [
    ItensFormComponent, 
    ItensListaComponent
  ],
  imports: [
    CommonModule,
    ItensRoutingModule,
    FormsModule
  ],
  exports: [
    ItensFormComponent,
    ItensListaComponent
  ]
})
export class ItensModule { }
