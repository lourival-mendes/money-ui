import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

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

  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Página não encontrada');
  }

}
