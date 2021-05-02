import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { LancamentoFiltroInterface, LancamentoService } from './../lancamento.service';

class LancamentoFormularioPesquisa implements LancamentoFiltroInterface {
  descricao!: string;
  vencimento!: Date;
  vencimentoAte!: Date;
}

@Component({
  selector: 'app-lancamento-pesquisa-formulario',
  templateUrl: './lancamento-pesquisa-formulario.component.html',
  styleUrls: ['./lancamento-pesquisa-formulario.component.css']
})
export class LancamentoPesquisaFormularioComponent implements OnInit{

  lancamentoFormularioPesquisa = new LancamentoFormularioPesquisa();

  @Output() lancamentoPesquisado = new EventEmitter();

constructor(private lancamentoService:LancamentoService){ }

ngOnInit(): void {
  this.pesquisar();
}

pesquisar() {
  this.lancamentoService.pesquisar(this.lancamentoFormularioPesquisa).then(
    result => {
      this.lancamentoPesquisado.emit(result);
    }
  );
}

}
