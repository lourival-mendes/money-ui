import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  //TODO: Configurar mais opções de erros, como por exemplo, resposta 404 do serviço RESTFull.

  constructor(

    private messageService: MessageService,
    private router: Router,

  ) { }

  handler(errorResponse: any) {

    console.log('errorHandler -> ', errorResponse);

    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (errorResponse instanceof HttpErrorResponse && errorResponse.status >= 400 && errorResponse.status <= 500) {

      msg = 'Ocorreu um erro ao processar a sua soliciatação!';

      if (errorResponse.status === 401 && errorResponse.error.error === "invalid_token") {
        msg = 'Sua sessão expirou';
        this.router.navigate(['/login']);
      }

      if (errorResponse.status === 403)
        msg = 'Você não tem permissão para executar esta ação!';

      try {
        msg = errorResponse.error[0].mensagemUsuario;
      } catch (e) { }

    } else {
      msg = 'Erro ao processar serviço remoto, Tente novamente.';
    }

    this.messageService.add({

      life: 10000,
      severity: 'error',
      summary: 'Operação não realizada!',
      detail: msg

    });

  }

}
