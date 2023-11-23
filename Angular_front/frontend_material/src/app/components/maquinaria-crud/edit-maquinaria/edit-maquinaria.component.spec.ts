import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMaquinariaComponent } from './edit-maquinaria.component';

describe('EditMaquinariaComponent', () => {
  let component: EditMaquinariaComponent;
  let fixture: ComponentFixture<EditMaquinariaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMaquinariaComponent]
    });
    fixture = TestBed.createComponent(EditMaquinariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
