import { Component, Input } from '@angular/core';

import { PessoaInterface } from './../../core/Interfaces/Pessoa';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent {

  @Input() pessoas: PessoaInterface[] = [];

  getNomeAcaoStatusToolTip(status: boolean): String {
    return status ? 'Desativar' : 'Ativar';
  }

  getNomeStatus(status: boolean):String {
    return status ? 'Ativo' : 'Inativo';
  }

  confirmarExclusao(lancamento: any) {
    console.log(JSON.stringify(lancamento))
  }
}
