import { TestBed } from '@angular/core/testing';

import { S3fileService } from './s3file.service';

describe('S3fileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: S3fileService = TestBed.get(S3fileService);
    expect(service).toBeTruthy();
  });
});
