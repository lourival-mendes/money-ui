import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { AuthService } from '../seguranca/auth.service';

registerLocaleData(localePt);

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,

    ConfirmPopupModule,
    ToastModule
],
  exports: [
    ConfirmPopupModule,
    ToastModule,

    NavbarComponent
  ],
  providers: [
    MessageService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },

    LancamentoService,
    AuthService,
    ErrorHandlerService
  ]
})
export class CoreModule { }
