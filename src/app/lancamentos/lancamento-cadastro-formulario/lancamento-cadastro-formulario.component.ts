import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { CategoriaService } from './../../categorias/categoria.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaInterface } from './../../core/Interfaces/Categoria';
import { PessoaInterface } from './../../core/Interfaces/Pessoa';
import { Lancamento } from './../../core/models/Lancamento';
import { PessoaService } from './../../pessoas/pessoa.service';
import { LancamentoService } from './../lancamento.service';



@Component({
  selector: 'app-lancamento-cadastro-formulario',
  templateUrl: './lancamento-cadastro-formulario.component.html',
  styleUrls: ['./lancamento-cadastro-formulario.component.css']
})
export class LancamentoCadastroFormularioComponent implements OnInit {

  tipos = [
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
    private errorHandlerService: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {

    const idLancanemto = this.route.snapshot.params['id'];

    if (idLancanemto)
      this.carregarLancamento(idLancanemto);

    this.categoriaService.listarTodas()
      .then(response => this.categorias = response)
      .catch(erro => this.mostrarMensagemErro(erro));

    this.pessoaService.listarTodas()
      .then(response => this.pessoas = response)
      .catch(erro => this.mostrarMensagemErro(erro));

  }

  carregarLancamento(idLancanemto: number) {

    this.lancamentoService.buscarPorId(idLancanemto)
      .then(response => this.lancamento = response)
      .catch(erro => this.mostrarMensagemErro(erro));

  }

  salvar() {

    if (this.lancamento.id)
      this.atualizar();
    else
      this.adicionar();

  }

  atualizar() {

    this.lancamentoService.atualizar(this.lancamento)
      .then(response => {

        this.lancamento = response;

        this.messageService.add({

          severity: `success`,
          summary: 'Operação realizada com sucesso.',
          detail: `O lançamento, ${response.descricao}, foi atualizado.`

        })

      })
      .catch(erro => this.mostrarMensagemErro(erro))

  }

  adicionar() {

    this.lancamentoService.adicionar(this.lancamento)
      .then(response => {

        this.messageService.add({

          severity: `success`,
          summary: 'Operação realizada com sucesso.',
          detail: `O lançamento, ${response.descricao}, foi adicionado.`

        });

        this.router.navigate(['/lancamentos',response.id])

      })
      .catch(erro => this.mostrarMensagemErro(erro));
  }

  novo(ngForm: NgForm) {
    ngForm.reset();
    this.lancamento = new Lancamento();
    this.router.navigate(['/lancamentos/novo'])
  }

  mostrarMensagemErro(erro: any) {

    console.log(`Ocorreu um erro ao tentar acessar servidor remoto! [Serviço de Lançamentos.]`, erro);

    if (erro?.error)
      this.errorHandlerService.handler(`${erro.error[0].mensagemUsuario}!`);
    else if (erro.status >= 400 && erro.status < 500)
      this.errorHandlerService.handler(`Ocorreu um erro ao tentar acessar servidor remoto!`);
    else
      this.errorHandlerService.handler(`Ocorreu um erro inesperado no servidor!`);

  }

}
