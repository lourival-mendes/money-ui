import { EnderecoInterface } from './../Interfaces/Endereco';
import { PessoaInterface } from './../Interfaces/Pessoa';

export class Pessoa implements PessoaInterface  {

  id!: number;
  nome!: string
  ativo!: boolean;
  endereco!: EnderecoInterface;

}

