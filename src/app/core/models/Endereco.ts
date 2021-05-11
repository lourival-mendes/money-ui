import { EnderecoInterface } from './../Interfaces/Endereco';

export class Endereco implements EnderecoInterface {

  logradouro!: string;
  numero!: string;
  complemento!: string;
  bairro!: string;
  cep!: string;
  cidade!: string;
  estado!: string;

}

