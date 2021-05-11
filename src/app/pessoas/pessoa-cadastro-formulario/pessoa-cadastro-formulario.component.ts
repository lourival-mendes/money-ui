import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';

import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService } from './../pessoa.service';
import { Pessoa } from './../../core/models/Pessoa';

@Component({
  selector: 'app-pessoa-cadastro-formulario',
  templateUrl: './pessoa-cadastro-formulario.component.html',
  styleUrls: ['./pessoa-cadastro-formulario.component.css']
})
export class PessoaCadastroFormularioComponent {

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  pessoa = new Pessoa();

  salvar(ngForm: NgForm) {

    this.pessoaService.adicionar(this.pessoa)
      .then(response => {

        this.messageService.add({

          severity: `success`,
          summary: 'Operação realizada com sucesso.',
          detail: `A pessoa de nome ${response.nome}, foi adicionada.`

        });

        ngForm.reset();

      })
      .catch(erro => this.mostrarMensagemErro(erro));
  }

  mostrarMensagemErro(erro: any) {

    if (erro?.error[0]?.mensagemUsuario != "Mensagem inválida")
      this.errorHandlerService.handler(`${erro.error[0].mensagemUsuario}!`);
    else if(erro.status >= 400 && erro.status < 500 )
      this.errorHandlerService.handler(`Ocorreu um erro ao tentar acessar servidor remoto!`);
    else
      this.errorHandlerService.handler(`Ocorreu um erro inesperado no servidor!`);

  }

  novo(formularioPessoa: NgForm) {
    formularioPessoa.reset();
  }

}
