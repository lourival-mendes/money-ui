import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';

import { LoginFormularioComponent } from './login-formulario/login-formulario.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginFormularioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return '';
        }
      }
    }),

    ButtonModule,
    RippleModule,
    InputTextModule,
    DividerModule,
    PasswordModule,

    SharedModule
  ],
  exports:[LoginFormularioComponent],
  providers: [JwtHelperService]
})
export class SegurancaModule { }
