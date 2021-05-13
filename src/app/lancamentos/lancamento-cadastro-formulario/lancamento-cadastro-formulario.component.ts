import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { CategoriaService } from './../../categorias/categoria.service';
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
    private route: ActivatedRoute,
    private router: Router,
    private title: Title

  ) { }

  ngOnInit(): void {

    this.title.setTitle('Cadastro de Lançamento');

    const idLancanemto = this.route.snapshot.params['id'];

    if (idLancanemto)
      this.carregarLancamento(idLancanemto);

    this.categoriaService.listarTodas()
      .then(response => this.categorias = response);

    this.pessoaService.listarTodas()
      .then(response => this.pessoas = response);

  }

  carregarLancamento(idLancanemto: number) {

    this.lancamentoService.buscarPorId(idLancanemto)
      .then(response => this.lancamento = response);

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

      });

  }

  adicionar() {

    this.lancamentoService.adicionar(this.lancamento)
      .then(response => {

        this.messageService.add({

          severity: `success`,
          summary: 'Operação realizada com sucesso.',
          detail: `O lançamento, ${response.descricao}, foi adicionado.`

        });

        this.router.navigate(['/lancamentos', response.id])

      });
  }

  novo(ngForm: NgForm) {
    ngForm.reset();
    this.lancamento = new Lancamento();
    this.router.navigate(['/lancamentos/novo'])
  }

}
