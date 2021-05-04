import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  //TODO: Configurar mais opções de erros, como por exemplo, resposta 404 do serviço RESTFull.

  constructor(private messageService: MessageService) { }

  handler(errorResponse: any) {

    let msg: string;

    msg = (typeof errorResponse === 'string') ? errorResponse : 'Erro ao processar o serviço remoto. Se persistir o problema, entre em contato com o suporte.';

    this.messageService.add({

      life:10000,
      severity: 'error',
      summary: 'Operação não realizada!',
      detail: msg

    });

  }

}
