import { TestBed } from '@angular/core/testing';

import { DocumentaryService } from './documentary.service';

describe('DocumentaryService', () => {
  let service: DocumentaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
