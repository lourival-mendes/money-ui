import { Component } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';

import { LancamentoService, LancamentoPesquisaInterface } from './../lancamento.service';
//TODO: Refatorar o código para componentizar o grid, se achar necessário.
class LancamentoPesquisa implements LancamentoPesquisaInterface {

  descricao!: string;
  vencimento!: Date;
  vencimentoAte!: Date;
  number=0; //pagina
  size=3; //itensPorPagina
  totalElements=0; //totalRegistros
  first=true; //primeiraPagina
  last=false; //ultimaPagina
  content: any; //content

}

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {

  lancamentoPesquisa = new LancamentoPesquisa;

  constructor(private lancamentoService: LancamentoService) { }

  pesquisar(pagina = 0) {

    this.lancamentoPesquisa.number = pagina;

    this.lancamentoService.pesquisar(this.lancamentoPesquisa).then(
      result => {

        this.lancamentoPesquisa = result;

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
    return !(this.lancamentoPesquisa.first && this.lancamentoPesquisa.last);
  }

  mostrarResultado(lancamentos: any) {
    this.lancamentoPesquisa = lancamentos;
  }

}
