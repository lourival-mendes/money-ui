import { Component } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {

  lancamentos = [
    {
      tipo:'DESPESA',
      descricao:'Compra de pão',
      dataVencimento: new Date(2021,6,30),
      dataPagamento: new Date(2021,6,31),
      valor:10.15,
      pessoa:'Lourival'
    },
    {
      tipo:'DESPESA',
      descricao:'Compra de pão',
      dataVencimento: new Date(2021,6,30),
      dataPagamento: new Date(2021,6,31),
      valor:10.15,
      pessoa:'Lourival'
    },
    {
      tipo:'DESPESA',
      descricao:'Compra de pão',
      dataVencimento: new Date(2021,6,30),
      dataPagamento: new Date(2021,6,31),
      valor:10.15,
      pessoa:'Lourival'
    },
    {
      tipo:'DESPESA',
      descricao:'Compra de pão',
      dataVencimento: new Date(2021,6,30),
      dataPagamento: new Date(2021,6,31),
      valor:10.15,
      pessoa:'Lourival'
    },
    {
      tipo:'DESPESA',
      descricao:'Compra de pão',
      dataVencimento: new Date(2021,6,30),
      dataPagamento: new Date(2021,6,31),
      valor:10.15,
      pessoa:'Lourival'
    },
    {
      tipo:'DESPESA',
      descricao:'Compra de pão',
      dataVencimento: new Date(2021,6,30),
      dataPagamento: new Date(2021,6,31),
      valor:10.15,
      pessoa:'Lourival'
    },
    {
      tipo:'DESPESA',
      descricao:'Compra de pão',
      dataVencimento: new Date(2021,6,30),
      dataPagamento: new Date(2021,6,31),
      valor:10.15,
      pessoa:'Lourival'
    },
    {
      tipo:'DESPESA',
      descricao:'Compra de pão',
      dataVencimento: new Date(2021,6,30),
      dataPagamento: new Date(2021,6,31),
      valor:10.15,
      pessoa:'Lourival'
    },
    {
      tipo:'DESPESA',
      descricao:'Compra de pão',
      dataVencimento: new Date(2021,6,30),
      dataPagamento: new Date(2021,6,31),
      valor:10.15,
      pessoa:'Lourival'
    },
    {
      tipo:'RECEITA',
      descricao:'13º Salário',
      dataVencimento: new Date(2021,6,30),
      dataPagamento: new Date(2021,6,31),
      valor:1200.00,
      pessoa:'Vânia'
    },

  ];

}
