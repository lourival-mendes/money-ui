import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { MessageService } from 'primeng/api';

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
export class LoginFormularioComponent {

  formulario = new Formulario();

  constructor(
    private auth: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  login() {
    this.auth.login(this.formulario.email, this.formulario.senha)
      .then(() => {

        this.router.navigate(['/lancamentos']);

      })
      .catch(erro => {

        this.messageService.add({ severity: 'error', summary: 'Ocorreu um erro!', detail: 'Usuário e/ou senha inválidos' });

      });
  }

}
