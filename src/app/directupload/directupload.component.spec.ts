import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectuploadComponent } from './directupload.component';

describe('DirectuploadComponent', () => {
  let component: DirectuploadComponent;
  let fixture: ComponentFixture<DirectuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
