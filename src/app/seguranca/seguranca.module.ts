import { environment } from './../../environments/environment.prod';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';

import { AuthGuard } from './auth.guard';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginFormularioComponent } from './login-formulario/login-formulario.component';
import { MoneyHttpInterceptor } from './money-http-interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return '';
        },
        allowedDomains: [environment.apiUrl],
        disallowedRoutes:[`${environment.apiUrl}/oauth/token`]
      }
    }),

    ButtonModule,
    RippleModule,
    InputTextModule,
    DividerModule,
    PasswordModule,

    SharedModule,
    SegurancaRoutingModule
  ],
  declarations: [LoginFormularioComponent],
  providers: [
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MoneyHttpInterceptor,
      multi: true
    },
    AuthGuard
  ]
})
export class SegurancaModule { }
