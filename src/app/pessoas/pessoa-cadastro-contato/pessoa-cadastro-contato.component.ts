import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { ConfirmationService } from 'primeng/api';

import { ContatoInterface } from 'src/app/core/Interfaces/Contato';

@Component({
  selector: 'app-pessoa-cadastro-contato',
  templateUrl: './pessoa-cadastro-contato.component.html',
  styleUrls: ['./pessoa-cadastro-contato.component.css']
})
export class PessoaCadastroContatoComponent implements OnInit {

  @Input()
  contatos!: Array<ContatoInterface>;

  formularioContato!: FormGroup;
  exibirFormularioContato = false;
  index?: number;

  constructor(

    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder

  ) {

    this.configurarFormularioContato();

  }

  ngOnInit(): void {
  }

  configurarFormularioContato() {

    this.formularioContato = this.formBuilder.group({
      id: [],
      nome: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
      email: [null, Validators.email],
      telefone: [null]
    });

  }

  adicionarContato() {

    this.contatos.push(this.formularioContato.value);

    this.formularioContato.reset;
    this.exibirFormularioContato = false;
    this.configurarFormularioContato();

  }

  editarContato(contato: ContatoInterface, index: number) {

    this.formularioContato.setValue(contato);
    this.index = index;
    this.exibirFormularioContato = true;

  }

  limparContato() {

    this.formularioContato.reset();
    this.index = undefined;
    this.exibirFormularioContato = false;

  }

  excluirContato(index: number) {

    this.contatos.splice(index, 1);
    this.limparContato();

  }

  salvarContato() {

    let posicao = (this.index === undefined) ? 0 : this.index;
    this.contatos[posicao] = this.formularioContato.value;
    this.limparContato();

  }

  confirmarExclusaoContato(contato: ContatoInterface, index: number, event: Event) {

    this.confirmationService.confirm({

      target: event.target!,

      message: 'Tem certeza que deseja EXCLUIR?',
      icon: 'pi pi-exclamation-triangle p-text-warning',

      acceptButtonStyleClass: 'p-button-icon p-button-warning',
      acceptIcon: 'pi pi-check',

      rejectButtonStyleClass: 'p-button-icon',
      rejectIcon: 'pi pi-times',

      accept: () => this.excluirContato(index)

    });

  }

  validarObrigatoriedade(input: FormControl) {

    return (input.value ? null : {
      obrigatoriedade: true
    })

  }

  validarTamanhoMinimo(tamanho: number): any {

    return (input: FormControl) => {
      return (!input.value || input.value.length >= tamanho) ? null : { tamanhoMinimo: { tamanho: tamanho } };
    };

  }
}
