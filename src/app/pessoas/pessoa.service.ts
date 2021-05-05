import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ErrorHandlerService } from './../core/error-handler.service';

export interface PessoaPesquisaInterface{

  id: number;
  nome: string;
  number:number;
  size:number;
  totalElements:number;
  first:boolean;
  last:boolean;
  content: any;

}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(

    private httpClient: HttpClient,
    private errorHandlerService: ErrorHandlerService

  ) { }

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
      .catch(response => {

        console.log(`Ocorreu um erro ao tentar acessar servidor remoto [Serviço de Pessoas: linha 51.]!`, response);
        this.errorHandlerService.handler(`Ocorreu um erro ao tentar acessar servidor remoto [Serviço de Pessoas -> pesquisar]!`);

      });
  }

  excluir(id:number): Promise<any> {

    const headers = new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('token')}` });

    return this.httpClient.delete(`${this.pessoasUrl}/${id}`, { headers })
      .toPromise()
      .then(() => null)
      .catch(response => response);

  }

}
