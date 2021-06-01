import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfirmationService, MessageService } from 'primeng/api';

import { ContatoInterface } from 'src/app/core/Interfaces/Contato';
import { PessoaService } from './../pessoa.service';



@Component({
  selector: 'app-pessoa-cadastro-formulario',
  templateUrl: './pessoa-cadastro-formulario.component.html',
  styleUrls: ['./pessoa-cadastro-formulario.component.css']
})
export class PessoaCadastroFormularioComponent implements OnInit {

  formulario!: FormGroup;
  contatos!: Array<ContatoInterface>;

  constructor(

    private pessoaService: PessoaService,
    private messageService: MessageService,
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService

  ) {    this.configurarFormulario();
  }

  ngOnInit(): void {


    const idPessoa = this.route.snapshot.params['id'];

    if (idPessoa)
      this.carregarPessoa(idPessoa);

    this.title.setTitle('Cadastro de Pessoa');

  }

  carregarPessoa(idPessoa: number) {

    this.pessoaService.buscarPorId(idPessoa)
      .then(response => {
        this.contatos = response.contatos;
        console.log(response.contatos);
        return this.formulario.patchValue(response)
      });

    }

  configurarFormulario() {

    this.formulario = this.formBuilder.group({
      id: [],
      nome: [null, this.validarObrigatoriedade],
      ativo: [true],
      endereco: this.formBuilder.group({
        logradouro: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(10)]],
        complemento: [null],
        numero: [null],
        bairro: [null, this.validarObrigatoriedade],
        cep: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(10)]],
        cidade: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(3)]],
        estado: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(2)]]
      })
    });

  }

  salvar() {

    if (this.formulario.get('id')?.value === null)
      this.adicionar();
    else
      this.atualizar();

  }

  atualizar() {

    this.pessoaService.atualizar(this.formulario.value)
      .then(response => {

        this.formulario.patchValue(response);

        this.messageService.add({

          severity: `success`,
          summary: 'Operação realizada com sucesso.',
          detail: `A pessoa, ${response.nome}, foi atualizada.`

        })

      });

  }

  adicionar() {

    this.pessoaService.adicionar(this.formulario.value)
      .then(response => {

        this.messageService.add({

          severity: `success`,
          summary: 'Operação realizada com sucesso.',
          detail: `A pessoa de nome ${response.nome}, foi adicionada.`

        });

        this.formulario.reset();

      });
  }

  confirmarExclusaoContato(contato: ContatoInterface, event: Event) {

    this.confirmationService.confirm({

      target: event.target!,

      message: 'Tem certeza que deseja EXCLUIR?',
      icon: 'pi pi-exclamation-triangle p-text-warning',

      acceptButtonStyleClass: 'p-button-icon p-button-warning',
      acceptIcon:'pi pi-check',

      rejectButtonStyleClass:'p-button-icon',
      rejectIcon:'pi pi-times',

      accept: () => this.excluirContato(contato),
      reject: () => this.messageService.add({

        severity: 'info',
        summary: 'Exclusão cancelada.',
        detail: `O contato de nome ${contato.nome} foi mantido.`

      })

    });

}
  excluirContato(contato: ContatoInterface) {
    return null;
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

  novo() {
    this.formulario.reset();
    this.router.navigate(['/pessoas/novo'])
  }

}
