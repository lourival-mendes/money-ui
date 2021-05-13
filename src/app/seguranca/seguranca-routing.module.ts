import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginFormularioComponent } from './login-formulario/login-formulario.component';

const routes: Routes = [
  { path: 'login', component: LoginFormularioComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SegurancaRoutingModule { }
