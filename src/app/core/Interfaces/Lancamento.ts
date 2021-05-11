import { CategoriaInterface } from './Categoria';
import { PessoaInterface } from './Pessoa';
import { Tipo } from './../enuns/Tipo';

export interface LancamentoInterface{

  id: number;
  tipo: Tipo;
  descricao: string;
  dataVencimento: string;
  dataPagamento: string;
  valor: number;
  observacao: string;
  pessoa: PessoaInterface;
  categoria: CategoriaInterface;

}
