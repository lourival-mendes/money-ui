import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaCadastroFormularioComponent } from './pessoa-cadastro-formulario.component';

describe('PessoaCadastroFormularioComponent', () => {
  let component: PessoaCadastroFormularioComponent;
  let fixture: ComponentFixture<PessoaCadastroFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PessoaCadastroFormularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaCadastroFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
