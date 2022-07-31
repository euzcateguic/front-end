import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiceUsuariosComponent } from './indice-usuarios.component';

describe('IndiceUsuariosComponent', () => {
  let component: IndiceUsuariosComponent;
  let fixture: ComponentFixture<IndiceUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndiceUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndiceUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
