import { Component } from '@angular/core';

import { AuthService } from '../auth.service';

class Formulario{
  email: string = '';
  senha: string = '';
}

@Component({
  selector: 'app-login-formulario',
  templateUrl: './login-formulario.component.html',
  styleUrls: ['./login-formulario.component.css']
})
export class LoginFormularioComponent {

  formulario = new Formulario();

  constructor(private auth: AuthService) { }

  login() {this.auth.login(this.formulario.email, this.formulario.senha);}

}
