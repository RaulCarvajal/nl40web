import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstratificacionComponent } from './estratificacion.component';

describe('EstratificacionComponent', () => {
  let component: EstratificacionComponent;
  let fixture: ComponentFixture<EstratificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstratificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstratificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
