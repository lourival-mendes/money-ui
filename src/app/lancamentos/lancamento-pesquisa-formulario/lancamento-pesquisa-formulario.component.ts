import { Component, OnInit } from '@angular/core';

import { LancamentoService } from './../lancamento.service';

class LancamentoFormularioPesquisa{
  descricao!: string;
  vencimento!: string;
  vencimentoAte!: string;
}

@Component({
  selector: 'app-lancamento-pesquisa-formulario',
  templateUrl: './lancamento-pesquisa-formulario.component.html',
  styleUrls: ['./lancamento-pesquisa-formulario.component.css']
})
export class LancamentoPesquisaFormularioComponent implements OnInit{

  lancamentoFormularioPesquisa = new LancamentoFormularioPesquisa();

constructor(private lancamentoService:LancamentoService){ }

  ngOnInit(): void {
    this.pesquisar();
  }

  pesquisar() {
    this.lancamentoFormularioPesquisa;
  }

}
