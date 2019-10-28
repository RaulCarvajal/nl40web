import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEstatificacionComponent } from './editar-estatificacion.component';

describe('EditarEstatificacionComponent', () => {
  let component: EditarEstatificacionComponent;
  let fixture: ComponentFixture<EditarEstatificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarEstatificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEstatificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
