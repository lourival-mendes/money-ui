import { Router } from '@angular/router';
import { Component } from '@angular/core';

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
    private roter: Router
  ) { }

  login() {
    this.auth.login(this.formulario.email, this.formulario.senha)
      .then(() => {
        this.roter.navigate(['/lancamentos']);
      })
      .catch(erro => {
        console.log(erro); //TODO: implementar errorHandler e exibição de mensagens de erros.
      });
  }

}
