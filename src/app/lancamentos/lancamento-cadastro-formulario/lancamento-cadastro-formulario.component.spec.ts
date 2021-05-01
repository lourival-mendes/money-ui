import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentoCadastroFormularioComponent } from './lancamento-cadastro-formulario.component';

describe('LancamentoCadastroComponent', () => {
  let component: LancamentoCadastroFormularioComponent;
  let fixture: ComponentFixture<LancamentoCadastroFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LancamentoCadastroFormularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LancamentoCadastroFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
