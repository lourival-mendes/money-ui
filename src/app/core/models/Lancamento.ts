import { Categoria } from './Categoria';
import { Pessoa } from './Pessoa';
import { LancamentoInterface } from './../Interfaces/Lancamento';
import { Tipo } from './../enuns/Tipo';
import { PessoaInterface } from './../Interfaces/Pessoa';
import { CategoriaInterface } from './../Interfaces/Categoria';

export class Lancamento implements LancamentoInterface{

  id!: number;
  tipo!: Tipo;
  descricao!: string;
  dataVencimento!: Date;
  dataPagamento!: Date;
  valor!: number;
  observacao!: string;
  pessoa!: PessoaInterface;
  categoria!: CategoriaInterface;

  constructor() {
    this.pessoa = new Pessoa();
    this.categoria = new Categoria();
  }

}
