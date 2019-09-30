import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarDireccionComponent } from './eliminar-direccion.component';

describe('EliminarDireccionComponent', () => {
  let component: EliminarDireccionComponent;
  let fixture: ComponentFixture<EliminarDireccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarDireccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
