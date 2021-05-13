import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-nao-autorizado',
  template: `
    <div class="container">
      <div class="p-grid">
          <div class="p-col-12">
              <h1>Acesso negado!</h1>
          </div>
      </div>
    </div>
    `,
  styles: [
  ]
})
export class NaoAutorizadoComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Acesso Negado');
  }


}
