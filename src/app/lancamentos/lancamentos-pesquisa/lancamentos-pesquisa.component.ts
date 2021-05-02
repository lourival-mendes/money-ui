import { Component, EventEmitter } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';

import { LancamentoService, LancamentoPesquisaInterface } from './../lancamento.service';
//TODO: Refatorar o código para componentizar o grid, se achar necessário.
class LancamentoPesquisa implements LancamentoPesquisaInterface {

  descricao!: string;
  vencimento!: Date;
  vencimentoAte!: Date;
  pagina=0;
  itensPorPagina=3;
  totalRegistros=0;
  primeiraPagina=true;
  ultimaPagina=false;

}

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {

  lancamentos: any;
  lancamentoPesquisa = new LancamentoPesquisa;

  constructor(private lancamentoService: LancamentoService) { }

  pesquisar(pagina = 0) {

    this.lancamentoPesquisa.pagina = pagina;

    this.lancamentoService.pesquisar(this.lancamentoPesquisa).then(
      result => {
        this.lancamentos = result['content'];
        this.lancamentoPesquisa.pagina = result['number'];
        this.lancamentoPesquisa.itensPorPagina = result['size'];
        this.lancamentoPesquisa.totalRegistros = result['totalElements'];
        this.lancamentoPesquisa.primeiraPagina = result['first'];
        this.lancamentoPesquisa.ultimaPagina = result['last'];

        this.mostrarPaginacao();
      });

  }

  mudarPagina(event: LazyLoadEvent) {

    const first = event.first ? event.first : 0;
    const rows = event.rows?event.rows:1;
    const pagina = (first / rows);

    this.pesquisar(pagina);

  }

  mostrarPaginacao():boolean {
    return !(this.lancamentoPesquisa.primeiraPagina && this.lancamentoPesquisa.ultimaPagina);
  }

  mostrarResultado(lancamentos: any) {
    this.lancamentos = lancamentos['content'];
    this.lancamentoPesquisa.pagina = lancamentos['number'];
    this.lancamentoPesquisa.itensPorPagina = lancamentos['size'];
    this.lancamentoPesquisa.totalRegistros = lancamentos['totalElements'];
    this.lancamentoPesquisa.primeiraPagina = lancamentos['first'];
    this.lancamentoPesquisa.ultimaPagina = lancamentos['last'];
  }

}
