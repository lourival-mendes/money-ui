import { Component, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';

import { PessoaService, PessoaPesquisaInterface } from './../pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

//TODO: Refatorar o código para componentizar o grid, se achar necessário.
class PessoaPesquisa implements PessoaPesquisaInterface {

  id!: number;
  nome!: string;
  number=0;
  size=3;
  totalElements=0;
  first=true;
  last=true;
  content: any;

}
@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  pessoaPesquisa = new PessoaPesquisa();
  loading=true;

  @ViewChild('tabela') grid:any;

  constructor(

    private pessoaService: PessoaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService

  ) { }

  getNomeAcaoStatusToolTip(status: boolean): String {
    return status ? 'Desativar' : 'Ativar';
  }

  getNomeStatus(status: boolean):String {
    return status ? 'Ativo' : 'Inativo';
  }

  pesquisar(pagina = 0) {

    this.loading = true;

    this.pessoaPesquisa.number = pagina;

    this.pessoaService.pesquisar(this.pessoaPesquisa).then( response => {

      console.log(response);

        this.pessoaPesquisa = response;

      })
      .catch(
        error => {

          if (typeof error === 'string')
            this.errorHandlerService.handler(error);
          else
            this.errorHandlerService.handler(`Ocorreu um erro ao acessar servidor remoto [pessoas-pesquisa-componente: linha 74.]!`);

        })
        .finally(()=>this.loading = false);

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

  confirmarExclusao(pessoa:any, event: Event) {

      this.confirmationService.confirm({

        target: event.target!,

        message: 'Tem certeza que deseja EXCLUIR?',
        icon: 'pi pi-exclamation-triangle p-text-warning',

        acceptLabel: 'Confirmar',
        acceptButtonStyleClass: 'p-button-icon p-button-warning',
        acceptIcon:'pi pi-check',

        rejectLabel: 'Cancelar',
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

  isError(response: any) {
    return response != null && !(undefined === response['status']) && (response['status'] > 300);
  }

  lancarErros(pessoa: any, response: any) {
    response['error'].forEach((mensagem: any) => {

      this.errorHandlerService.handler(`A pessoa de nome ${pessoa.nome} não pode ser excluída! [${mensagem['mensagemUsuario']}]`);
      console.log(mensagem['mensagemDesenvolvedor']);

    });
  }

  excluir(pessoa: any) {

    this.pessoaService.excluir(pessoa.id).then( response => {

      if (this.isError(response)) {

        if (typeof response === 'string')
          this.errorHandlerService.handler(response);
        else
          this.lancarErros(pessoa, response);

      } else {

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

    })
      .catch(error => {

        if (typeof error === 'string')
          this.errorHandlerService.handler(error);
        else
          this.errorHandlerService.handler(`A pessoa de nome ${pessoa.nome} não pode ser excluída!`);

      });
  }

}
