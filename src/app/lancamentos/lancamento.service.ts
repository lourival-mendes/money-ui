import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../seguranca/auth.service';

import * as moment from 'moment';

export interface LancamentoPesquisaInterface{

  descricao: string;
  vencimento: Date;
  vencimentoAte: Date;
  pagina: number;
  itensPorPagina: number;
  totalRegistros:number;
  primeiraPagina:boolean;
  ultimaPagina:boolean;

}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';
  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  pesquisar(lancamentoPesquisa: LancamentoPesquisaInterface): Promise<any> {

    let stringParams = `page=${lancamentoPesquisa.pagina}&size=${lancamentoPesquisa.itensPorPagina}`;

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
      .then(response => response)
      .catch(response => {
           console.log(response);
        });
  }
}
