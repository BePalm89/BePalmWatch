import { TestBed } from '@angular/core/testing';

import { InfoMovieService } from './info-movie.service';

describe('InfoMovieService', () => {
  let service: InfoMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
