import { ContatoInterface } from '../Interfaces/Contato';

export class Contato implements ContatoInterface {

  id!: number;
  nome!: string;
  email!: string;
  telefone!: string;

}
