import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment'
import { ErrorHandlerService } from './../core/error-handler.service';
import { PessoaInterface } from '../core/Interfaces/Pessoa';
import { PessoaPesquisaInterface } from './../core/Interfaces/PessoaPesquisa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl: string;

  constructor(

    private httpClient: HttpClient,
    private errorHandlerService: ErrorHandlerService

  ) {

    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
  }

  alterarAtivacao(pessoa: PessoaInterface): Promise<PessoaInterface> {

    const options = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient.put(
      `${this.pessoasUrl}/${pessoa.id}/ativo`, !pessoa.ativo , options)
      .toPromise<any>()
      .then(response => response)
      .catch(error => {

        console.log(`[Serviço de Pessoas -> alterarAtivo]`, error);
        this.errorHandlerService.handler(error);

      });

  }

  listarTodas() : Promise<PessoaInterface[]> {

      const options = { headers: new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('token')}` }) };

      return this.httpClient.get<any>(
        `${this.pessoasUrl}/listar` , options)
        .toPromise()
        .then(response => response)
        .catch(error => {

          console.log(`[Serviço de Pessoas -> listarTodas]`, error);
          this.errorHandlerService.handler(error);

        });
    }

  pesquisar(pessoaPesquisa: PessoaPesquisaInterface): Promise<any> {

    let fromString = `?page=${pessoaPesquisa.number}&size=${pessoaPesquisa.size}`;

    if (pessoaPesquisa.nome)
    fromString += `&nome=${pessoaPesquisa.nome.trim()}`;

    const options = {
      headers: new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('token')}` }),
      params: new HttpParams({ fromString })
    };

    return this.httpClient.get<any>(
      `${this.pessoasUrl}` , options)
      .toPromise()
      .then(response => response)
      .catch(error => {

        console.log(`[Serviço de Pessoas -> pesquisar]`, error);
        this.errorHandlerService.handler(error);

      });
  }

  excluir(id: number): Promise<any> {

    const headers = new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('token')}` });

    return this.httpClient.delete(`${this.pessoasUrl}/${id}`, { headers })
      .toPromise()
      .then(() => null)
      .catch(error =>  {

        console.log(`[Serviço de Pessoas -> excluir]`, error);
        this.errorHandlerService.handler(error);

      });

  }

  adicionar(pessoa: PessoaInterface): Promise<PessoaInterface> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });

    return this.httpClient.post<PessoaInterface>(this.pessoasUrl, pessoa, { headers })
      .toPromise<any>()
      .then(response => response)
      .catch(error =>  {

        console.log(`[Serviço de Pessoas -> excluir]`, error);
        this.errorHandlerService.handler(error);

      });
  }

}
