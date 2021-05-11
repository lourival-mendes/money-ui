import { Endereco } from './Endereco';
import { EnderecoInterface } from './../Interfaces/Endereco';
import { PessoaInterface } from './../Interfaces/Pessoa';

export class Pessoa implements PessoaInterface {

  id!: number;
  nome!: string;
  ativo: boolean = true;
  endereco!: EnderecoInterface;

  constructor() {
    this.endereco = new Endereco();
  }

}

