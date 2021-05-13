import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from '../auth.service';

class Formulario{
  email: string = 'minhavirtude@gmail.com';
  senha: string = 'admin';
}

@Component({
  selector: 'app-login-formulario',
  templateUrl: './login-formulario.component.html',
  styleUrls: ['./login-formulario.component.css']
})
export class LoginFormularioComponent implements OnInit {

  formulario = new Formulario();

  constructor(
    private auth: AuthService,
    private router: Router,
    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.auth.jwtPayload=null;
  }

  login() {
    this.auth.login(this.formulario.email, this.formulario.senha)
      .then(() => {

        this.router.navigate(['/lancamentos']);
        this.messageService.add({ severity: 'success', summary: 'Operação realizada.', detail: 'Conectado.'});

      })
      .catch(erro => {

        this.errorHandlerService.handler(erro);

      });
  }

}
