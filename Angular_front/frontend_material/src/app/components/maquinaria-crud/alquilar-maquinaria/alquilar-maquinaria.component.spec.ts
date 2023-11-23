import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlquilarMaquinariaComponent } from './alquilar-maquinaria.component';

describe('AlquilarMaquinariaComponent', () => {
  let component: AlquilarMaquinariaComponent;
  let fixture: ComponentFixture<AlquilarMaquinariaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlquilarMaquinariaComponent]
    });
    fixture = TestBed.createComponent(AlquilarMaquinariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
