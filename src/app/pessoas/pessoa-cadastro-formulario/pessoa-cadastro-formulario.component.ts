import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';

class pessoaFormulario{

  nome!: string;
  logradouro!: string;
  numero!: string;
  complemento!: string;
  bairro!: string;
  cep!: string;
  cidade!: string;
  estado!: string;

}

@Component({
  selector: 'app-pessoa-cadastro-formulario',
  templateUrl: './pessoa-cadastro-formulario.component.html',
  styleUrls: ['./pessoa-cadastro-formulario.component.css']
})
export class PessoaCadastroFormularioComponent {

  pessoaFormulario = new pessoaFormulario();

  salvar() {
    console.log(this.pessoaFormulario);
  }

  novo(formularioPessoa: NgForm) {
    formularioPessoa.reset();
  }

}
