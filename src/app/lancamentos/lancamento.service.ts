import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { environment } from './../../environments/environment'
import { ErrorHandlerService } from './../core/error-handler.service';
import { LancamentoPesquisaInterface } from './../core/Interfaces/LancamentoPesquisa';
import { LancamentoInterface } from '../core/Interfaces/Lancamento';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl: string;
  constructor(

    private httpClient: HttpClient,
    private errorHandlerService: ErrorHandlerService

  ) {

    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;

  }

  urlUploadAnexo(): string {
    return `${this.lancamentosUrl}/anexo`;
  };

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

    return this.httpClient.get<any>(`${this.lancamentosUrl}?resumo`, options)
      .toPromise()
      .then(response => response)
      .catch(error => {

        console.log('[Serviço Lançamento -> pesquisar]', error);
        this.errorHandlerService.handler(error);

      });
  }

  excluir(id: number): Promise<any> {

    const headers = new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('token')}` });

    return this.httpClient.delete(`${this.lancamentosUrl}/${id}`, { headers })
      .toPromise()
      .catch(error => {

        console.log('[Serviço Lançamento -> excluir]', error);
        this.errorHandlerService.handler(error);

      });


  }

  adicionar(lancamento: LancamentoInterface): Promise<LancamentoInterface> {

    lancamento = this.formatarDataSend(lancamento);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });

    return this.httpClient.post<LancamentoInterface>(this.lancamentosUrl, lancamento, { headers })
      .toPromise<any>()
      .then(response => response)
      .catch(error => {

        console.log('[Serviço Lançamento -> adicionar]', error);
        this.errorHandlerService.handler(error);

      });
  }

  buscarPorId(id: number): Promise<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.httpClient.get<any>(`${this.lancamentosUrl}/${id}`, { headers })
      .toPromise<any>()
      .then(response => this.formatarDataResponse(response))
      .catch(error => {

        console.log('[Serviço Lançamento -> buscarPorId]', error);
        this.errorHandlerService.handler(error);

      });
  }

  atualizar(lancamento: LancamentoInterface): Promise<any> {

    lancamento = this.formatarDataSend(lancamento);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });

    return this.httpClient.put<any>(`${this.lancamentosUrl}/${lancamento.id}`, lancamento, { headers })
      .toPromise<any>()
      .then(response => this.formatarDataResponse(response))
      .catch(error => {

        console.log('[Serviço Lançamento -> atualizar]', error);
        this.errorHandlerService.handler(error);

      });
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
