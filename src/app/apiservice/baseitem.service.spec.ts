import { TestBed } from '@angular/core/testing';

import { BaseitemsService } from './baseitem.service';

describe('BaseitemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseitemsService = TestBed.get(BaseitemsService);
    expect(service).toBeTruthy();
  });
});
