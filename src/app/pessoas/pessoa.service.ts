import { Pessoa } from './../lancamentos/lancamento-cadastro-formulario/lancamento-cadastro-formulario.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ErrorHandlerService } from './../core/error-handler.service';

export interface PessoaInterface {

  id: number;
  nome: string;
  ativo: boolean;
  endereco: EnderecoInterface;

}

export interface EnderecoInterface {

  logradouro: string;
	numero: string;
	complemento: string;
	bairro: string;
	cep: string;
	cidade: string;
	estado: string;

}

export interface PessoaPesquisaInterface {

  id: number;
  nome: string;
  ativo: boolean;
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

  alterarAtivacao(pessoa: any) {

    const options = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient.put(
      `${this.pessoasUrl}/${pessoa.id}/ativo`, !pessoa.ativo , options)
      .toPromise()
      .then(() => null)
      .catch(response => {

        console.log(`[Serviço de Pessoas -> alterarAtivo]`, response);
        this.errorHandlerService.handler(`Ocorreu um erro ao tentar acessar servidor remoto!`);

      });

  }

  listarTodas() : Promise<PessoaInterface[]> {

      const options = { headers: new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('token')}` }) };

      return this.httpClient.get<PessoaPesquisaInterface>(
        `${this.pessoasUrl}` , options)
        .toPromise<PessoaPesquisaInterface>()
        .then(response => response.content)
        .catch(response => {

          console.log(`[Serviço de Pessoas -> pesquisar]`, response);
          this.errorHandlerService.handler(`Ocorreu um erro ao tentar acessar servidor remoto!`);
          return [];

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
      .catch(response => {

        console.log(`[Serviço de Pessoas -> pesquisar]`, response);
        this.errorHandlerService.handler(`Ocorreu um erro ao tentar acessar servidor remoto!`);

      });
  }

  excluir(id:number): Promise<any> {

    const headers = new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('token')}` });

    return this.httpClient.delete(`${this.pessoasUrl}/${id}`, { headers })
      .toPromise()
      .then(() => null)
      .catch(response =>  {

        console.log(`[Serviço de Pessoas -> excluir]`, response);
        this.errorHandlerService.handler(`Ocorreu um erro ao tentar acessar servidor remoto!`);

      });

  }

}
