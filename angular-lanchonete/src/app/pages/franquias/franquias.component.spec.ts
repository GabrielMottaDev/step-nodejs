import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranquiasComponent } from './franquias.component';

describe('FranquiasComponent', () => {
  let component: FranquiasComponent;
  let fixture: ComponentFixture<FranquiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranquiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranquiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
