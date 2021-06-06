import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService, ConfirmationService } from 'primeng/api';

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

  ocultarSpinner: boolean = true;

  ocultarAnexo: boolean = true;

  formulario!: FormGroup;

  constructor(

    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService

  ) {

    this.ocultarSpinner = true;

  }

  ngOnInit(): void {

    this.configurarFormulario();

    this.title.setTitle('Cadastro de Lançamento');

    const idLancamento = this.route.snapshot.params['id'];

    if (idLancamento) {

      this.carregarLancamento(idLancamento);

    }

    this.categoriaService.listarTodas()
      .then(response => this.categorias = response);

    this.pessoaService.listarTodas()
      .then(response => this.pessoas = response);

  }

  uploadFinalizado() {

    this.ocultarSpinner = true;
    this.ocultarAnexo = false;

  }

  urlUploadAnexo() {

    return this.lancamentoService.urlUploadAnexo();

  }

  nomeAnexo() {

    const nome = this.formulario.get('anexo')?.value;
    return nome ? nome.substring(nome.indexOf('_') + 1, nome.length) : '';

  }

  urlAnexo() {

    const url: string = this.formulario.get('urlAnexo')?.value?.replace('\\\\', "https://");
    return url;

  }

  removerAnexo() {

    this.formulario.value.anexo = null;
    this.formulario.value.urlAnexo = null;
    this.ocultarAnexo = true;

  }

  confirmarExclusaoAnexo(event: Event) {

    this.confirmationService.confirm({

      target: event.target!,

      message: 'Tem certeza que deseja EXCLUIR o anexo?',
      icon: 'pi pi-exclamation-triangle p-text-warning',

      acceptButtonStyleClass: 'p-button-icon p-button-warning',
      acceptIcon: 'pi pi-check',

      rejectButtonStyleClass: 'p-button-icon',
      rejectIcon: 'pi pi-times',

      accept: () => this.removerAnexo(),
      reject: () => this.messageService.add({

        severity: 'info',
        summary: 'Exclusão cancelada.',
        detail: `O anexo foi mantido.`

      })

    });

  }

  salvarDadosUpload(event: any) {

    const anexo = event.originalEvent.body;

    this.formulario.patchValue({
      anexo: anexo.nome,
      urlAnexo: anexo.url
    });


    this.uploadFinalizado();

  }

  exibirErro() {

    this.messageService.add({

      severity: `error`,
      summary: 'Ocorreu um erro!',
      detail: `O anexo não foi enviado.`

    });

    this.uploadFinalizado();

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
      observacao: [],
      anexo: [null],
      urlAnexo: [null]
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

  carregarLancamento(idLancamento: number) {

    this.lancamentoService.buscarPorId(idLancamento)
      .then(response => {
        this.formulario.patchValue(response);

        console.log(response.anexo);

        if (response.anexo == null)
          this.ocultarAnexo = true;
        else
          this.ocultarAnexo = false;

      });

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

        this.router.navigate([`/lancamentos/${response.id}`]);

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

        this.router.navigate([`/lancamentos/${response.id}`]);

      });


  }

  novo() {
    this.formulario.reset();
    this.router.navigate(['/lancamentos/novo'])
  }

}
