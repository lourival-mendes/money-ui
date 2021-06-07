import { Title } from '@angular/platform-browser';
import { Component, ViewChild, OnInit } from '@angular/core';

import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService } from './../pessoa.service';
import { PessoaInterface } from 'src/app/core/Interfaces/Pessoa';
import { PessoaPesquisaInterface } from './../../core/Interfaces/PessoaPesquisa';
import { PessoaPesquisa } from './../../core/models/PessoaPesquisa';
import { AuthService } from './../../seguranca/auth.service';

//TODO: Refatorar o código para componentizar o grid, se achar necessário.
@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  pessoaPesquisa = new PessoaPesquisa();
  loading=true;

  @ViewChild('tabela') grid:any;

  constructor(

    private pessoaService: PessoaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,
    private title: Title,
    public auth: AuthService

  ) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de Pessoas');
  }

  getNomeAcaoStatusToolTip(status: boolean): String {
    return status ? 'Clique para desativar' : 'Clique para ativar';
  }

  getNomeStatus(status: boolean):String {
    return status ? 'Ativo' : 'Inativo';
  }

  pesquisar(pagina = 0) {

    this.loading = true;

    this.pessoaPesquisa.number = pagina;

    this.pessoaService.pesquisar(this.pessoaPesquisa)
      .then(response => this.pessoaPesquisa = response)
      .catch(
        error => {

          if (typeof error === 'string')
            this.errorHandlerService.handler(error);
          else
            this.errorHandlerService.handler(`Ocorreu um erro ao acessar servidor remoto [pessoas-pesquisa-componente: linha 74.]!`);

        })
        .finally(()=>this.loading = false);

  }

  alterarAtivacao(pessoa: PessoaInterface) {

    const statusAlterado = !pessoa.ativo;

    this.loading = true;

    this.pessoaService.alterarAtivacao(pessoa)
      .then(() => {

        pessoa.ativo = statusAlterado;

        const severity = pessoa.ativo ? 'success' : 'warn';
        const ativo = pessoa.ativo ? 'Ativada' : 'Desativada';

        this.messageService.add({

          severity: `${severity}`,
          summary: 'Operação realizada com sucesso.',
          detail: `A pessoa ${pessoa.nome} foi ${ativo}.`

        });
      })
      .finally(() => this.loading = false);

  }

  mudarPagina(event: LazyLoadEvent) {

    this.loading = true;

    const first = event.first ? event.first : 0;
    const rows = event.rows ? event.rows : 1;
    const pagina = (first / rows);

    this.pesquisar(pagina);

  }

  mostrarPaginacao():boolean {

    return (this.pessoaPesquisa.totalElements > this.pessoaPesquisa.size) && !(this.pessoaPesquisa.first && this.pessoaPesquisa.last);

  }

  mostrarResultado(pessoaPesquisa: PessoaPesquisaInterface) {

    this.pessoaPesquisa = pessoaPesquisa;

  }

  confirmarExclusao(pessoa: PessoaInterface, event: Event) {

      this.confirmationService.confirm({

        target: event.target!,

        message: 'Tem certeza que deseja EXCLUIR?',
        icon: 'pi pi-exclamation-triangle p-text-warning',

        acceptButtonStyleClass: 'p-button-icon p-button-warning',
        acceptIcon:'pi pi-check',

        rejectButtonStyleClass:'p-button-icon',
        rejectIcon:'pi pi-times',

        accept: () => this.excluir(pessoa),
        reject: () => this.messageService.add({

          severity: 'info',
          summary: 'Exclusão cancelada.',
          detail: `A pessoa de nome ${pessoa.nome} foi mantida.`

        })

      });

  }

  excluir(pessoa: PessoaInterface) {

    this.pessoaService.excluir(pessoa.id).then( response => {

      if (response === null) {

        if (this.grid.first === 0)
          this.pesquisar();
        else
          this.grid.reset();

        this.messageService.add({

          severity: 'success',
          summary: 'Operação realizada com sucesso.',
          detail: `A pessoa de nome ${pessoa.nome} foi excluída.`

        });

      }

    });
  }

}
