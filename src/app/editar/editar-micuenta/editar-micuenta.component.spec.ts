import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMicuentaComponent } from './editar-micuenta.component';

describe('EditarMicuentaComponent', () => {
  let component: EditarMicuentaComponent;
  let fixture: ComponentFixture<EditarMicuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarMicuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarMicuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
