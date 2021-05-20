import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../seguranca/auth.guard';
import { LancamentoCadastroFormularioComponent } from './lancamento-cadastro-formulario/lancamento-cadastro-formulario.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';

const routes: Routes = [
  {
    path: '',
    component: LancamentosPesquisaComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_PESQUISAR_LANCAMENTO']}
  },
  {
    path: 'novo',
    component: LancamentoCadastroFormularioComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_CADASTRAR_LANCAMENTO']}
  },
  {
    path: ':id',
    component: LancamentoCadastroFormularioComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_CADASTRAR_LANCAMENTO']}
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LancamentosRoutingModule { }
