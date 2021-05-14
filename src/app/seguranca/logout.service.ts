import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from './../core/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  lougoutUrl = 'http://localhost:8080/tokens/revoke';

  constructor(

    private httpClient: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private messageService: MessageService

  ) { }

  logout(): Promise<any> {

    return this.httpClient.delete(
      this.lougoutUrl,
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
