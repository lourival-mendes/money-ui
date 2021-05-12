import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-nao-encontrada',
  template: `
    <div class="container">
      <div class="p-grid">
          <div class="p-col-12">
              <h1>Página não encontrada!</h1>
          </div>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class PaginaNaoEncontradaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
