import { PessoasRoutingModule } from './pessoas-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';

import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';
import { PessoaPesquisaFormularioComponent } from './pessoa-pesquisa-formulario/pessoa-pesquisa-formulario.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroFormularioComponent } from './pessoa-cadastro-formulario/pessoa-cadastro-formulario.component';
import { SharedModule } from '../shared/shared.module';
import { PessoaCadastroContatoComponent } from './pessoa-cadastro-contato/pessoa-cadastro-contato.component';

@NgModule({
  declarations: [
    PessoaCadastroFormularioComponent,
    PessoasPesquisaComponent,
    PessoaPesquisaFormularioComponent,
    PessoasGridComponent,
    PessoaCadastroContatoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    DropdownModule,
    InputTextareaModule,
    InputNumberModule,
    SelectButtonModule,
    PaginatorModule,
    PanelModule,
    DialogModule,

    ButtonModule,
    RippleModule,
    InputTextModule,
    InputMaskModule,
    TableModule,
    TooltipModule,

    SharedModule,
    PessoasRoutingModule
  ],
  exports: []
})
export class PessoasModule { }
