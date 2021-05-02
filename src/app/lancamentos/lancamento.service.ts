import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../seguranca/auth.service';

export interface LancamentoFiltroInterface{
  descricao: string;
  vencimento: Date;
  vencimentoAte: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';
  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  pesquisar(lancamentoFiltro: LancamentoFiltroInterface): Promise<any> {


    let stringParams = '';

    if (lancamentoFiltro.descricao)
      stringParams += `descricao=${lancamentoFiltro.descricao.trim()}`;

    if (lancamentoFiltro.vencimento) {

      if (stringParams.length > 0)
        stringParams += '&';

      stringParams += `vencimento=${lancamentoFiltro.vencimento}`;

    }

    if (lancamentoFiltro.vencimentoAte) {

      if (stringParams.length > 0)
        stringParams += '&';

      stringParams += `vencimentoAte=${lancamentoFiltro.vencimentoAte}`;

    }

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
      .then(response => response['content'])
      .catch(response => {
           console.log(response);
        });
  }
}
