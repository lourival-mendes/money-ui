import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

const routes: Routes = [

  { path: 'lancamentos', loadChildren: () => import('./lancamentos/lancamentos.module').then(response => response.LancamentosModule) },
  { path: 'pessoas', loadChildren: () => import('./pessoas/pessoas.module').then(response => response.PessoasModule) },
  { path: 'login', loadChildren: () => import('./seguranca/seguranca.module').then(response => response.SegurancaModule) },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
