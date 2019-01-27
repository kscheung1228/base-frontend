import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Baseitems1Component } from './baseitems1.component';

describe('Baseitems1Component', () => {
  let component: Baseitems1Component;
  let fixture: ComponentFixture<Baseitems1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Baseitems1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Baseitems1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
