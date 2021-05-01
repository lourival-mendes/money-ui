import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LancamentoCadastroFormularioComponent } from './lancamentos/lancamento-cadastro-formulario/lancamento-cadastro-formulario.component';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { PessoaCadastroFormularioComponent } from './pessoas/pessoa-cadastro-formulario/pessoa-cadastro-formulario.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { LoginFormularioComponent } from './seguranca/login-formulario/login-formulario.component';

const routes: Routes = [

  { path: '', component: LoginFormularioComponent },

  { path: 'lancamentos', component: LancamentosPesquisaComponent },
  { path: 'lancamentos/novo', component: LancamentoCadastroFormularioComponent },
  { path: 'lancamentos/:id', component: LancamentoCadastroFormularioComponent },

  { path: 'pessoas', component: PessoasPesquisaComponent },
  { path: 'pessoas/novo', component: PessoaCadastroFormularioComponent },
  { path: 'pessoas/:id', component: PessoaCadastroFormularioComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
