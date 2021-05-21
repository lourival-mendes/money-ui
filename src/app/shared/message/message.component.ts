import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  template: `<small id="{{ control.name }}-help" class="ng-invalid" *ngIf="exibirErro()">{{ mensagem }}</small>`,
  styles: []
})
export class MessageComponent {

  @Input()
  error!: string;

  @Input()
  control!: any;

  @Input()
  mensagem!: string;

  exibirErro(): boolean {
    return this.control.hasError(this.error) && (this.control.touched || this.control.dirty);
  }

}
