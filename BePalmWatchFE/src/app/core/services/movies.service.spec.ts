import { TestBed } from '@angular/core/testing';

import { MoviesService } from './movies.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FAVORITE_MOVIE, MOVIE, MOVIE_DETAILS } from '../mocks/movie.mock';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MoviesService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getMovies with correct url, params and header and return an array of movies', () => {
    const mockResponse = MOVIE;

    service.getMovies().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpController.expectOne((request) => {
      return (
        request.url === "https://api.themoviedb.org/3/discover/movie" &&
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

  it('should call getFavoriteMovies with correct url, params and header and return an array of favorite movies', () => {
    const mockResponse = FAVORITE_MOVIE;

    service.getFavoriteMovies().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpController.expectOne((request) => {
      return (
        request.url === "https://api.themoviedb.org/3/account/10346540/favorite/movies" &&
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

  it('should call getDetailsMovie with correct url, params and header and return the details of a movies', () => {
    const mockResponse = MOVIE_DETAILS;

    service.getDetailsMovie(MOVIE_DETAILS.id).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpController.expectOne((request) => {
      return (
        request.url === `https://api.themoviedb.org/3/movie/${MOVIE_DETAILS.id}` &&
        request.method === "GET",
      request.headers.get("Authorization") ===
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTU3YTA3NGM5MDM0Zjg0NmJhNTM4ODFhOWVmMWViNyIsIm5iZiI6MTcyNDE0MDA3Ny45MTUwODQsInN1YiI6IjYwNzA4ZGM4Y2MyNzdjMDAyYTgwMGE0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ck5in_IMa7ZGNC9cz-D1iXLfNDPoWb6MA-72x1ENSyo" &&
        request.params.has("language") &&
        request.params.get("language") === "en-US"
      );
    });

    req.flush(mockResponse);
  });

  it('should call addFavorite with correct url, params and header and return an successfull message ', () => {
    const mockPayload = {
      media_type: "movie",
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
        request.url === `https://api.themoviedb.org/3/account/10346540/favoritE` &&
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
