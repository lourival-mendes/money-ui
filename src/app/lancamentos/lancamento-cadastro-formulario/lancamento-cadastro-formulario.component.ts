import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PessoaService, } from './../../pessoas/pessoa.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { CategoriaInterface } from './../../core/Interfaces/Categoria';
import { PessoaInterface } from './../../core/Interfaces/Pessoa';
import { Lancamento } from './../../core/models/Lancamento';
import { Tipo } from './../../core/enuns/Tipo';

@Component({
  selector: 'app-lancamento-cadastro-formulario',
  templateUrl: './lancamento-cadastro-formulario.component.html',
  styleUrls: ['./lancamento-cadastro-formulario.component.css']
})
export class LancamentoCadastroFormularioComponent implements OnInit{

  tipos= [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];
  categorias!: CategoriaInterface[];
  pessoas!: PessoaInterface[];

  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService
  ) { }

  ngOnInit(): void {

    this.categoriaService.listarTodas().then(response => this.categorias = response);
    this.pessoaService.listarTodas().then(response => this.pessoas = response);

  }

  salvar() {
    console.log(this.lancamento);
  }

  novo(ngForm: NgForm) {
    ngForm.reset();
  }

}
