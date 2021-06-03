import { LancamentosRoutingModule } from './lancamentos-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorModule } from 'primeng/paginator';
import { FileUploadModule } from 'primeng/FileUpload';

import { LancamentosGridComponent } from './lancamentos-grid/lancamentos-grid.component';
import { LancamentoCadastroFormularioComponent } from './lancamento-cadastro-formulario/lancamento-cadastro-formulario.component';
import { LancamentoPesquisaFormularioComponent } from './lancamento-pesquisa-formulario/lancamento-pesquisa-formulario.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LancamentosPesquisaComponent,
    LancamentoPesquisaFormularioComponent,
    LancamentoCadastroFormularioComponent,
    LancamentosGridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,

    PaginatorModule,
    ButtonModule,
    RippleModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    InputMaskModule,
    SelectButtonModule,
    TableModule,
    TooltipModule,
    FileUploadModule,

    SharedModule,
    LancamentosRoutingModule
  ],
  exports:[]
})
export class LancamentosModule { }
