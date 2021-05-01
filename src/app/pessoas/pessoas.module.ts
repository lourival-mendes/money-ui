import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';

import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';
import { PessoaPesquisaFormularioComponent } from './pessoa-pesquisa-formulario/pessoa-pesquisa-formulario.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroFormularioComponent } from './pessoa-cadastro-formulario/pessoa-cadastro-formulario.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PessoaCadastroFormularioComponent,
    PessoasPesquisaComponent,
    PessoaPesquisaFormularioComponent,
    PessoasGridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    ButtonModule,
    RippleModule,
    InputTextModule,
    InputMaskModule,
    TableModule,
    TooltipModule,

    SharedModule
  ],
  exports: [
    PessoaCadastroFormularioComponent,
    PessoasPesquisaComponent,
    PessoaPesquisaFormularioComponent,
    PessoasGridComponent
  ]
})
export class PessoasModule { }
