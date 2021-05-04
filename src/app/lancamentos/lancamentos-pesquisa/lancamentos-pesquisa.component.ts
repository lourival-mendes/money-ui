import { Component, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';

import { LancamentoService, LancamentoPesquisaInterface } from './../lancamento.service';
//TODO: Refatorar o código para componentizar o grid, se achar necessário.
class LancamentoPesquisa implements LancamentoPesquisaInterface {

  id!: number;
  descricao!: string;
  vencimento!: Date;
  vencimentoAte!: Date;
  number=0;
  size=3;
  totalElements!:number;
  first!:boolean;
  last!:boolean;
  content: any;

}

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {

  lancamentoPesquisa = new LancamentoPesquisa;

  loading=true;

  @ViewChild('tabela') grid:any;

  constructor(

    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService

  ) { }

  pesquisar(pagina = 0) {

    this.loading = true;

    this.lancamentoPesquisa.number = pagina;

    this.lancamentoService.pesquisar(this.lancamentoPesquisa).then(
      result => {

        this.lancamentoPesquisa = result;

        this.mostrarPaginacao();

        this.loading = false;

      });

  }

  mudarPagina(event: LazyLoadEvent) {

    this.loading = true;

    const first = event.first ? event.first : 0;
    const rows = event.rows?event.rows:1;
    const pagina = (first / rows);

    this.pesquisar();

  }

  mostrarPaginacao():boolean {

    return !(this.lancamentoPesquisa.first && this.lancamentoPesquisa.last);

  }

  mostrarResultado(lancamentoPesquisa: LancamentoPesquisaInterface) {

    this.lancamentoPesquisa = lancamentoPesquisa;

  }

  confirmarExclusao(lancamento:any, event: Event) {

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

        accept: () => this.excluir(lancamento),
        reject: () => this.messageService.add({

          severity: 'info',
          summary: 'Exclusão cancelada.',
          detail: `O lançamento ${lancamento.descricao}, no valor de R$ ${lancamento.valor} foi mantido.`

        })

      });

  }

  excluir(lancamento: any) {

    this.lancamentoService.excluir(lancamento.id).then(() => {

      if (this.grid.first === 0)
        this.pesquisar();
      else
        this.grid.reset();

      this.messageService.add({

        severity: 'success',
        summary: 'Operação realizda com sucesso.',
        detail: `O lançamento ${lancamento.descricao}, no valor de R$ ${lancamento.valor} foi excluído.`

      });

    }).catch(() => {
      this.messageService.add({

        severity: 'error',
        summary: 'Operação não realizda!',
        detail: `O lançamento ${lancamento.descricao}, no valor de R$ ${lancamento.valor} não pode ser excluído!`

      });

    });

  }

}
