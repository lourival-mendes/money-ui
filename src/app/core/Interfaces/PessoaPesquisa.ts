import { PessoaInterface } from './Pessoa';

export interface PessoaPesquisaInterface {

  id: number;
  nome: string;
  ativo: boolean;
  number:number;
  size:number;
  totalElements:number;
  first:boolean;
  last:boolean;
  content: PessoaInterface[];

}

