import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { LayoutComponent } from '../layout/layout.component';
import { LocaisFormComponent } from './locais-form/locais-form.component';
import { LocaisListaComponent } from './locais-lista/locais-lista.component';


const routes: Routes = [
  {
    path: 'locais', component: LayoutComponent, canActivate: [AuthGuard], children: [
      { path: 'form', component: LocaisFormComponent },
      { path: 'form/:id', component: LocaisFormComponent },
      { path: 'lista', component: LocaisListaComponent },
      { path: '', redirectTo: 'lista', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocaisRoutingModule { }
