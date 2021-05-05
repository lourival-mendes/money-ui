import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PessoaService, PessoaInterface, EnderecoInterface } from './../../pessoas/pessoa.service';
import { CategoriaInterface, CategoriaService } from './../../categorias/categoria.service';

interface Tipo {
  nome: string
}

export class Categoria implements CategoriaInterface {

  id!: number;
  nome!: string

}

export class Pessoa implements PessoaInterface  {

  id!: number;
  nome!: string
  ativo!: boolean;
  endereco!: EnderecoInterface;

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

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService
  ) {

    this.categoriaService.listarTodas().then(response => this.categorias = response);

    this.tipos = [
        {nome: 'RECEITA'},
        {nome: 'DESPESA'}
      ];

    this.pessoaService.listarTodas().then(response => this.pessoas = response);

  }

  salvar() {
    console.log(this.lancamentoFormulario);
  }

  novo(formularioLancamento: NgForm) {
    formularioLancamento.reset();
  }

}
