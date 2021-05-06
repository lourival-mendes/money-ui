import { Component, Input, Output, EventEmitter } from '@angular/core';

import { LancamentoInterface } from './../../core/Interfaces/Lancamento';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent {

  @Input() lancamentos!: LancamentoInterface[];
  @Input() itensPorPagina!: number;
  @Input() pagina!: number;
  @Input() totalRegistros!: number;
  @Input() ultimaPagina!: number;
  @Input() primeiraPagina!: number;

  @Output() lazyLoadEvent = new EventEmitter();

}
