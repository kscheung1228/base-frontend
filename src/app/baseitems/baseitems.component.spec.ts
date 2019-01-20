import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseitemsComponent } from './baseitems.component';

describe('BaseitemsComponent', () => {
  let component: BaseitemsComponent;
  let fixture: ComponentFixture<BaseitemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseitemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
