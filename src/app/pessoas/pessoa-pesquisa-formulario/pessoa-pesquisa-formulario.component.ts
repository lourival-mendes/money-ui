import { Component} from '@angular/core';

@Component({
  selector: 'app-pessoa-pesquisa-formulario',
  templateUrl: './pessoa-pesquisa-formulario.component.html',
  styleUrls: ['./pessoa-pesquisa-formulario.component.css']
})
export class PessoaPesquisaFormularioComponent {

  nomePessoa!: string;

  pesquisar() {
    console.log(this.nomePessoa);
  }

}
