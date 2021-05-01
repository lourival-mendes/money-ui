import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Tipo {
  nome: string
}

interface Categoria {
  id: number;
  nome: string
}

interface Pessoa {
  id: number;
  nome: string
}

class LancamentoCadastro {

  tipo!: any;
  vencimento!: Date;
  pagamento!: Date;
  descricao!: string;
  valor!: number;
  categoria!: any;
  pessoa!: any;
  observacao!: string;

}

@Component({
  selector: 'app-lancamento-cadastro-formulario',
  templateUrl: './lancamento-cadastro-formulario.component.html',
  styleUrls: ['./lancamento-cadastro-formulario.component.css']
})
export class LancamentoCadastroFormularioComponent{

  tipos!: Tipo[];
  categorias!: Categoria[];
  pessoas!: Pessoa[];

  lancamentoFormulario = new LancamentoCadastro();

  constructor() {

    this.tipos = [
        {nome: 'RECEITA'},
        {nome: 'DESPESA'}
      ];

      this.categorias = [
        {
          id: 1,
          nome: 'Aluguel'
        },
        {
          id: 2,
          nome: 'Água'
        },
        {
          id: 3,
          nome: 'Luz'
        },
        {
          id: 4,
          nome: 'Gás'
        }
      ];

      this.pessoas = [
        {
          id: 1,
          nome: 'Lourival Mendes'
        },
        {
          id: 2,
          nome: 'Vânia Carvalho'
        }
      ];

  }

  salvar() {
    console.log(this.lancamentoFormulario);
  }

  novo(formularioLancamento: NgForm) {
    formularioLancamento.reset();
  }

}
