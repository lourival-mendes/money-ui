import { HttpClient, HttpHeaders } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';

import { ErrorHandlerService } from './../core/error-handler.service';

export interface CategoriaInterface{

  id: number;
  nome: string;

}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaUrl = "http://localhost:8080/categorias";
  categorias!: CategoriaInterface[];

  constructor(

    private httpClient: HttpClient,
    private errorHandlerService: ErrorHandlerService

  ) { }

  listarTodas(): Promise<CategoriaInterface[]> {

    const options = { headers: new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('token')}` }) }

    return this.httpClient
      .get<CategoriaInterface[]>(this.categoriaUrl, options)
      .toPromise<CategoriaInterface[]>()
      .then(response => this.categorias = response)
      .catch(response => {
        this.errorHandlerService.handler('Ocorreu um erro no servidor remoto.');
        console.log(response);
        return [];
      })

  }

}
