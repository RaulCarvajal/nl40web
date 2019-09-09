import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEstatificacionComponent } from './form-estatificacion.component';

describe('FormEstatificacionComponent', () => {
  let component: FormEstatificacionComponent;
  let fixture: ComponentFixture<FormEstatificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEstatificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEstatificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
