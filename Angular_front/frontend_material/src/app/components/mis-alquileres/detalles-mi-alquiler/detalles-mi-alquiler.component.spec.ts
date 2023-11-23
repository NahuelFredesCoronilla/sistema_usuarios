import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesMiAlquilerComponent } from './detalles-mi-alquiler.component';

describe('DetallesMiAlquilerComponent', () => {
  let component: DetallesMiAlquilerComponent;
  let fixture: ComponentFixture<DetallesMiAlquilerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallesMiAlquilerComponent]
    });
    fixture = TestBed.createComponent(DetallesMiAlquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
