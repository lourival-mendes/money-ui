import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment'
import { ErrorHandlerService } from './../core/error-handler.service';
import { CategoriaInterface } from './../core/Interfaces/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaUrl: string;
  categorias!: CategoriaInterface[];

  constructor(

    private httpClient: HttpClient,
    private errorHandlerService: ErrorHandlerService

  ) {
      this.categoriaUrl = `${environment.apiUrl}/categorias`;
}

  listarTodas(): Promise<CategoriaInterface[]> {

    const options = { headers: new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('token')}` }) }

    return this.httpClient
      .get<CategoriaInterface[]>(this.categoriaUrl, options)
      .toPromise<CategoriaInterface[]>()
      .then(response => this.categorias = response)
      .catch(error => {
        this.errorHandlerService.handler(error);
        return [];
      })

  }

}
