import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentoPesquisaFormularioComponent } from './lancamento-pesquisa-formulario.component';

describe('LancamentoFormComponent', () => {
  let component: LancamentoPesquisaFormularioComponent;
  let fixture: ComponentFixture<LancamentoPesquisaFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LancamentoPesquisaFormularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LancamentoPesquisaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
