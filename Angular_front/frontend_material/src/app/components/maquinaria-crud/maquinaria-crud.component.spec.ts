import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaquinariaCrudComponent } from './maquinaria-crud.component';

describe('MaquinariaCrudComponent', () => {
  let component: MaquinariaCrudComponent;
  let fixture: ComponentFixture<MaquinariaCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaquinariaCrudComponent]
    });
    fixture = TestBed.createComponent(MaquinariaCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
