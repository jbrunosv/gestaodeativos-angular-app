import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { LayoutComponent } from '../layout/layout.component';
import { ItensFormComponent } from './itens-form/itens-form.component';
import { ItensListaComponent } from './itens-lista/itens-lista.component';


const routes: Routes = [
  { path: 'itens', component: LayoutComponent, canActivate: [AuthGuard], children: [
    {path: 'form', component: ItensFormComponent},
    {path: 'form/:id', component: ItensFormComponent},
    {path: 'lista', component: ItensListaComponent},
    {path: '', redirectTo: 'lista', pathMatch: 'full'}
  ] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItensRoutingModule { }
