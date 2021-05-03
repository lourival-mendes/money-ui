import { LancamentoPesquisaInterface } from './../lancamento.service';
import { Component, Output, EventEmitter } from '@angular/core';

class LancamentoPesquisaFormulario implements LancamentoPesquisaInterface{

  descricao!: string;
  vencimento!: Date;
  vencimentoAte!: Date;
  number!: number;
  size!: number;
  totalElements!: number;
  first!: boolean;
  last!: boolean;
  content: any;

}

@Component({
  selector: 'app-lancamento-pesquisa-formulario',
  templateUrl: './lancamento-pesquisa-formulario.component.html',
  styleUrls: ['./lancamento-pesquisa-formulario.component.css']
})
export class LancamentoPesquisaFormularioComponent {

  @Output()
  lancamentoPesquisado = new EventEmitter();

  lancamentoPesquisaFormulario = new LancamentoPesquisaFormulario();

  pesquisar() {
    this.lancamentoPesquisado.emit(this.lancamentoPesquisaFormulario);
  }

}
