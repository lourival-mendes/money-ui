import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/api';

import { environment } from './../../environments/environment'
import { ErrorHandlerService } from './../core/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  logoutUrl: string;

  constructor(

    private httpClient: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private messageService: MessageService

  ) { 
    this.logoutUrl = `${environment.apiUrl}/tokens/revoke`;
  }

  logout(): Promise<any> {

    return this.httpClient.delete(
      this.logoutUrl,
      { withCredentials: true }
    ).toPromise()
      .then(() => {

        this.messageService.add(
          {
            severity: 'success',
            detail: 'Solicitação atendida',
            life: 5000,
            summary: 'Conta desconectada.'
          }
        );

      })
      .catch(error => this.errorHandlerService.handler(error))

  }
}
