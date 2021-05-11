import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { formatDate } from '@angular/common';

import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoService } from './../lancamento.service';
import { PessoaService, } from './../../pessoas/pessoa.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { CategoriaInterface } from './../../core/Interfaces/Categoria';
import { PessoaInterface } from './../../core/Interfaces/Pessoa';
import { Lancamento } from './../../core/models/Lancamento';

@Component({
  selector: 'app-lancamento-cadastro-formulario',
  templateUrl: './lancamento-cadastro-formulario.component.html',
  styleUrls: ['./lancamento-cadastro-formulario.component.css']
})
export class LancamentoCadastroFormularioComponent implements OnInit{

  tipos= [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];
  categorias!: CategoriaInterface[];
  pessoas!: PessoaInterface[];

  lancamento = new Lancamento();

  constructor(

    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService

  ) { }

  ngOnInit(): void {

    this.categoriaService.listarTodas()
      .then(response => this.categorias = response)
      .catch(erro => this.mostrarMensagemErro(erro));

    this.pessoaService.listarTodas()
      .then(response => this.pessoas = response)
      .catch(erro => this.mostrarMensagemErro(erro));

  }

  salvar(ngForm: NgForm) {

    this.lancamento.dataPagamento = formatDate(this.lancamento.dataPagamento,'yyyy-MM-dd','en-US');
    this.lancamento.dataVencimento = formatDate(this.lancamento.dataVencimento,'yyyy-MM-dd','en-US');

    this.lancamentoService.adicionar(this.lancamento)
      .then( response => {

        this.messageService.add({

          severity: `success`,
          summary: 'Operação realizada com sucesso.',
          detail: `O lançamento, ${response.descricao}, foi adicionado.`

        });

        ngForm.reset();

      })
      .catch(erro => this.mostrarMensagemErro(erro));
  }

  novo(ngForm: NgForm) {
    ngForm.reset();
  }

  mostrarMensagemErro(erro: any) {

    console.log(`Ocorreu um erro ao tentar acessar servidor remoto! [Serviço de Lançamentos.]`, erro);

    if (erro?.error)
      this.errorHandlerService.handler(`${erro.error[0].mensagemUsuario}!`);
    else if(erro.status >= 400 && erro.status < 500 )
      this.errorHandlerService.handler(`Ocorreu um erro ao tentar acessar servidor remoto!`);
    else
      this.errorHandlerService.handler(`Ocorreu um erro inesperado no servidor!`);


  }

}
