import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaPesquisaFormularioComponent } from './pessoa-pesquisa-formulario.component';

describe('PessoaPesquisaFormularioComponent', () => {
  let component: PessoaPesquisaFormularioComponent;
  let fixture: ComponentFixture<PessoaPesquisaFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PessoaPesquisaFormularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaPesquisaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
