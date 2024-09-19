import { TestBed } from '@angular/core/testing';

import { TvService } from './tv.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FAVOTIRE_TV_SHOW, TV_SHOW } from '../mocks/tv.mock';

describe('TvService', () => {
  let service: TvService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TvService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getMovies with correct url, params and header and return an array of tv show', () => {
    const mockResponse = TV_SHOW;

    service.getTVShows().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpController.expectOne((request) => {
      return (
        request.url === "https://api.themoviedb.org/3/discover/tv" &&
        request.method === "GET",
      request.headers.get("Authorization") ===
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTU3YTA3NGM5MDM0Zjg0NmJhNTM4ODFhOWVmMWViNyIsIm5iZiI6MTcyNDE0MDA3Ny45MTUwODQsInN1YiI6IjYwNzA4ZGM4Y2MyNzdjMDAyYTgwMGE0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ck5in_IMa7ZGNC9cz-D1iXLfNDPoWb6MA-72x1ENSyo" &&
        request.params.has("language") &&
        request.params.get("language") === "en-US" &&
        request.params.has("sort_by") && 
        request.params.get("sort_by") === 'popularity.desc'
      );
    });

    req.flush(mockResponse);
  });

  it('should call getFavoriteTvShow with correct url, params and header and return an array of favorite tv shows', () => {
    const mockResponse = FAVOTIRE_TV_SHOW;

    service.getFavoriteTvShow().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpController.expectOne((request) => {
      return (
        request.url === "https://api.themoviedb.org/3/account/10346540/favorite/tv" &&
        request.method === "GET",
      request.headers.get("Authorization") ===
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTU3YTA3NGM5MDM0Zjg0NmJhNTM4ODFhOWVmMWViNyIsIm5iZiI6MTcyNDE0MDA3Ny45MTUwODQsInN1YiI6IjYwNzA4ZGM4Y2MyNzdjMDAyYTgwMGE0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ck5in_IMa7ZGNC9cz-D1iXLfNDPoWb6MA-72x1ENSyo" &&
        request.params.has("language") &&
        request.params.get("language") === "en-US" &&
        request.params.has("sort_by") && 
        request.params.get("sort_by") === 'popularity.desc'
      );
    });

    req.flush(mockResponse);
  });

  it('should call addFavorite with correct url, params and header and return an successfull message ', () => {
    const mockPayload = {
      media_type: "tv",
      media_id: 748783,
      favorite: true
    };

    service.addFavorite(mockPayload).subscribe((response) => {
      expect(response).toEqual({
        success: true,
        status_code: 1,
        status_message: "Success."
      });
    });

    const req = httpController.expectOne((request) => {
      return (
        request.url === `https://api.themoviedb.org/3/account/10346540/favorite` &&
        request.method === "POST",
      request.headers.get("Authorization") ===
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTU3YTA3NGM5MDM0Zjg0NmJhNTM4ODFhOWVmMWViNyIsIm5iZiI6MTcyNDE0MDA3Ny45MTUwODQsInN1YiI6IjYwNzA4ZGM4Y2MyNzdjMDAyYTgwMGE0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ck5in_IMa7ZGNC9cz-D1iXLfNDPoWb6MA-72x1ENSyo" &&
        request.params.has("language") &&
        request.params.get("language") === "en-US"
      );
    });

    req.flush({});
  });

});
