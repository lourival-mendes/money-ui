import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { CategoriaService } from './../../categorias/categoria.service';
import { CategoriaInterface } from './../../core/Interfaces/Categoria';
import { PessoaInterface } from './../../core/Interfaces/Pessoa';
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

  formulario!: FormGroup;

  constructor(

    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit(): void {

    this.configurarFormulario();

    this.title.setTitle('Cadastro de Lançamento');

    const idLancanemto = this.route.snapshot.params['id'];

    if (idLancanemto)
      this.carregarLancamento(idLancanemto);

    this.categoriaService.listarTodas()
      .then(response => this.categorias = response);

    this.pessoaService.listarTodas()
      .then(response => this.pessoas = response);

  }

  configurarFormulario() {

    this.formulario = this.formBuilder.group({
      id: [],
      tipo: ['RECEITA', this.validarObrigatoriedade],
      dataVencimento: [null, this.validarObrigatoriedade],
      dataPagamento: [],
      descricao: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
      valor: [null, this.validarObrigatoriedade],
      categoria: this.formBuilder.group({
        id: [null, this.validarObrigatoriedade],
        nome: []
      }),
      pessoa: this.formBuilder.group({
        id: [null, this.validarObrigatoriedade],
        nome: []
      }),
      observacao: []
    });

  }

  validarTamanhoMinimo(tamanho: number): any {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= tamanho) ? null : { tamanhoMinimo: { tamanho: tamanho } };
    };
  }

  validarObrigatoriedade(input: FormControl) {

    return (input.value ? null : {
      obrigatoriedade: true
    })

  }

  carregarLancamento(idLancanemto: number) {

    this.lancamentoService.buscarPorId(idLancanemto)
      .then(response => this.formulario.patchValue(response));

  }

  salvar() {

    if (this.formulario.get('id')?.value === null)
      this.adicionar();
    else
      this.atualizar();

  }

  atualizar() {

    this.lancamentoService.atualizar(this.formulario.value)
      .then(response => {

        this.formulario.patchValue(response);

        this.messageService.add({

          severity: `success`,
          summary: 'Operação realizada com sucesso.',
          detail: `O lançamento, ${response.descricao}, foi atualizado.`

        })

      });

  }

  adicionar() {

    this.lancamentoService.adicionar(this.formulario.value)
      .then(response => {

        this.messageService.add({

          severity: `success`,
          summary: 'Operação realizada com sucesso.',
          detail: `O lançamento, ${response.descricao}, foi adicionado.`

        });

        this.router.navigate(['/lancamentos', response.id])

      });
  }

  novo() {
    this.formulario.reset();
    this.router.navigate(['/lancamentos/novo'])
  }

}
