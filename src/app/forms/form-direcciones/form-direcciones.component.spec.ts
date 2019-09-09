import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDireccionesComponent } from './form-direcciones.component';

describe('FormDireccionesComponent', () => {
  let component: FormDireccionesComponent;
  let fixture: ComponentFixture<FormDireccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDireccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDireccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
