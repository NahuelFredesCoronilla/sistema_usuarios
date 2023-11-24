import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoDuracionComponent } from './grafico-duracion.component';

describe('GraficoDuracionComponent', () => {
  let component: GraficoDuracionComponent;
  let fixture: ComponentFixture<GraficoDuracionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficoDuracionComponent]
    });
    fixture = TestBed.createComponent(GraficoDuracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
