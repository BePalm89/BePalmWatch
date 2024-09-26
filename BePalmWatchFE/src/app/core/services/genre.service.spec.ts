import { TestBed } from "@angular/core/testing";

import { GenreService } from "./genre.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { GENRE_MOVIE, GENRE_MOVIE_MAPPED, GENRE_TV_SHOW, GENRE_TV_SHOW_MAPPED } from "../mocks/genre.mock";

describe("GenreService", () => {
  let service: GenreService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(GenreService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should call fetchGenreMovies with the right ulr, params and header and return the array of genre", () => {
    const mockResponse = GENRE_MOVIE;

    service.fetchGenreMovies().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpController.expectOne((request) => {
      return (
        request.url === "https://api.themoviedb.org/3/genre/movie/list" &&
          request.method === "GET",
        request.headers.get("Authorization") ===
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTU3YTA3NGM5MDM0Zjg0NmJhNTM4ODFhOWVmMWViNyIsIm5iZiI6MTcyNDE0MDA3Ny45MTUwODQsInN1YiI6IjYwNzA4ZGM4Y2MyNzdjMDAyYTgwMGE0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ck5in_IMa7ZGNC9cz-D1iXLfNDPoWb6MA-72x1ENSyo" &&
          request.params.has("language") &&
          request.params.get("language") === "en-US"
      );
    });

    req.flush(mockResponse);
  });

  it('should set genre Movie correctly when using the setGenreMovie', () => {
    // Given 
    const genreData = GENRE_MOVIE;

    // When
    service.setGenreMovie(genreData);

    const genreMovieMap = service.getGenreMovie();

    // Then
    expect(genreMovieMap).toEqual(GENRE_MOVIE_MAPPED);
  });

  it('should return genreMapMovies as empty object initially', () => {
    // When
    const genreMapMovies = service.getGenreMovie();

    // Then
    expect(genreMapMovies).toEqual({});
  });

  it("should call fetchGenreTvShows with the right ulr, params and header and return the array of genre", () => {
    const mockResponse = GENRE_TV_SHOW;

    service.fetchGenreTvShows().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpController.expectOne((request) => {
      return (
        request.url === "https://api.themoviedb.org/3/genre/tv/list" &&
          request.method === "GET",
        request.headers.get("Authorization") ===
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTU3YTA3NGM5MDM0Zjg0NmJhNTM4ODFhOWVmMWViNyIsIm5iZiI6MTcyNDE0MDA3Ny45MTUwODQsInN1YiI6IjYwNzA4ZGM4Y2MyNzdjMDAyYTgwMGE0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ck5in_IMa7ZGNC9cz-D1iXLfNDPoWb6MA-72x1ENSyo" &&
          request.params.has("language") &&
          request.params.get("language") === "en-US"
      );
    });

    req.flush(mockResponse);
  });

  it('should set genre TV correctly when using the setGenreTvShow', () => {
    // Given 
    const genreData = GENRE_TV_SHOW;

    // When
    service.setGenreTvShow(genreData);

    const genreMovieMap = service.getGenreTvShow();

    // Then
    expect(genreMovieMap).toEqual(GENRE_TV_SHOW_MAPPED);
  });

  it('should return genreMapMovies as empty object initially', () => {
    // When
    const genreMapTvShow = service.getGenreMovie();

    // Then
    expect(genreMapTvShow).toEqual({});
  });

});
