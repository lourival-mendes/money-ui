import { ContatoInterface } from '../Interfaces/Contato';
import { EnderecoInterface } from './../Interfaces/Endereco';
import { PessoaInterface } from './../Interfaces/Pessoa';
import { Endereco } from './Endereco';

export class Pessoa implements PessoaInterface {

  id!: number;
  nome!: string;
  ativo: boolean = true;
  endereco: EnderecoInterface;
  contatos: Array<ContatoInterface>;

  constructor() {
    this.endereco = new Endereco();
    this.contatos = [];
  }

}
