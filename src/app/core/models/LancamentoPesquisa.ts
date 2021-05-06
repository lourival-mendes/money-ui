import { LancamentoPesquisaInterface } from './../Interfaces/LancamentoPesquisa';

export class LancamentoPesquisa implements LancamentoPesquisaInterface {

  id!: number;
  descricao!: string;
  vencimento!: Date;
  vencimentoAte!: Date;
  number=0;
  size=3;
  totalElements=0;
  first=true;
  last=true;
  content: any;

}

