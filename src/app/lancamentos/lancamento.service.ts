import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { LancamentoPesquisaInterface } from './../core/Interfaces/LancamentoPesquisa';
import { LancamentoInterface } from '../core/Interfaces/Lancamento';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';
  constructor(

    private httpClient: HttpClient

  ) { }

  pesquisar(lancamentoPesquisa: LancamentoPesquisaInterface): Promise<any> {

    let stringParams = `page=${lancamentoPesquisa.number}&size=${lancamentoPesquisa.size}`;

    if (lancamentoPesquisa.descricao)
      stringParams += `&descricao=${lancamentoPesquisa.descricao.trim()}`;

    if (lancamentoPesquisa.vencimento)
      stringParams += `&dataVencimentoDe=${moment(lancamentoPesquisa.vencimento).format('YYYY-MM-DD')}`;

    if (lancamentoPesquisa.vencimentoAte)
      stringParams += `&dataVencimentoAte=${moment(lancamentoPesquisa.vencimentoAte).format('YYYY-MM-DD')}`;

    const options = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }),
      params: new HttpParams({
        fromString: `${stringParams}`
      })
    };

    return this.httpClient.get<any>(`${this.lancamentosUrl}?resumo`, options).toPromise();
  }

  excluir(id: number): Promise<any> {

    const headers = new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('token')}` });

    return this.httpClient.delete(`${this.lancamentosUrl}/${id}`, { headers }).toPromise();

  }

  adicionar(lancamento: LancamentoInterface): Promise<LancamentoInterface> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });

    return this.httpClient.post<LancamentoInterface>(this.lancamentosUrl, lancamento, { headers }).toPromise();
  }

  buscarPorId(id: number): Promise<LancamentoInterface> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.httpClient.get<LancamentoInterface>(`${this.lancamentosUrl}/${id}`, { headers })
      .toPromise()
      .then(response => this.formatarDataResponse(response));
  }

  atualizar(lancamento: LancamentoInterface): Promise<LancamentoInterface> {

    lancamento = this.formatarDataSend(lancamento);
    console.log(lancamento);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });

    return this.httpClient.put<LancamentoInterface>(`${this.lancamentosUrl}/${lancamento.id}`, lancamento, { headers })
      .toPromise()
      .then(response => this.formatarDataResponse(response));
  }

  private formatarDataSend(lancamento: any): any {

    if (lancamento.dataPagamento)
      lancamento.dataPagamento = moment(lancamento.dataPagamento).format('YYYY-MM-DD');

    if (lancamento.dataVencimento)
      lancamento.dataVencimento = moment(lancamento.dataVencimento).format('YYYY-MM-DD');

    return lancamento;

  }

  private formatarDataResponse(lancamento: LancamentoInterface): LancamentoInterface {

    if (lancamento.dataPagamento)
      lancamento.dataPagamento = moment(lancamento.dataPagamento).toDate();

    if (lancamento.dataVencimento)
      lancamento.dataVencimento = moment(lancamento.dataVencimento).toDate();

    return lancamento;

  }



}
