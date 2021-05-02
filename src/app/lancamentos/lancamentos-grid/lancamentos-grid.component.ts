import { LancamentoPesquisaInterface } from './../lancamento.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent {

  @Input() lancamentos!: any;
  @Input() itensPorPagina!: number;
  @Input() pagina!: number;
  @Input() totalRegistros!: number;
  @Input() ultimaPagina!: number;
  @Input() primeiraPagina!: number;

  @Output() lazyLoadEvent = new EventEmitter();
/**
  mudarPagina(evento: LazyLoadEvent) {
    this.lazyLoadEvent.emit(evento);
  }
 */
  mostrarPaginacao() {
    return !(this.primeiraPagina && this.ultimaPagina);
  }

  confirmarExclusao(lancamento: any) {
    console.log('LancametosGrid - confirmarExclusao',JSON.stringify(lancamento))
  }
}
