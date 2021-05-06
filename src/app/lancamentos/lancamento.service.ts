import { LancamentoPesquisaInterface } from './../core/Interfaces/LancamentoPesquisa';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { ErrorHandlerService } from './../core/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';
  constructor(

    private httpClient: HttpClient,
    private errorHandlerService: ErrorHandlerService

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

    return this.httpClient.get<any>(
      `${this.lancamentosUrl}?resumo` , options)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(response => {

        console.log(`Ocorreu um erro ao tentar acessar servidor remoto [Serviço de Lançamentos: linha 66.]!`, response);
        this.errorHandlerService.handler(`Ocorreu um erro ao tentar acessar servidor remoto [Serviço de Lançamentos - pesquisar]!`);

        return response;

      });
  }

  excluir(id:number): Promise<any> {

    const headers = new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('token')}` });

    return this.httpClient.delete(`${this.lancamentosUrl}/${id}`, { headers })
      .toPromise()
      .then(() => null)
      .catch(response => response);

  }
}
