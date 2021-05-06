import { LancamentoInterface } from './Lancamento';

export interface LancamentoPesquisaInterface{

  id: number;
  descricao: string;
  vencimento: Date;
  vencimentoAte: Date;
  number:number;
  size:number;
  totalElements:number;
  first:boolean;
  last:boolean;
  content: LancamentoInterface[];

}
