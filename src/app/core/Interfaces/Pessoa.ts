import { EnderecoInterface } from './Endereco';

export interface PessoaInterface {

  id: number;
  nome: string;
  ativo: boolean;
  endereco: EnderecoInterface;

}
