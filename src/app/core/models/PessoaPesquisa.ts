import { PessoaInterface } from '../Interfaces/Pessoa';
import { PessoaPesquisaInterface } from './../Interfaces/PessoaPesquisa';

export class PessoaPesquisa implements PessoaPesquisaInterface {

  id!: number;
  nome!: string;
  ativo!: boolean;
  number = 0;
  size=3;
  totalElements=0;
  first = true;
  last=true;
  content!: PessoaInterface[];

}
