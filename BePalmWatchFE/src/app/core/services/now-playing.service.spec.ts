import { TestBed } from "@angular/core/testing";

import { NowPlayingService } from "./now-playing.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import {
  NOW_PLAYING_MOVIE,
  NOW_PLAYING_MOVIE_DETAILS,
  NOW_PLAYING_MOVIE_DETAILS_UPDATED,
  SHOWTIME_PAYLOAD,
} from "../mocks/now-playing.mock";

describe("NowPlayingService", () => {
  let service: NowPlayingService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(NowPlayingService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should call getNowPlayingMovies and return an array of movie", () => {
    const mockResponse = NOW_PLAYING_MOVIE;

    service.getNowPlayingMovies().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpController.expectOne({
      method: "GET",
      url: `http://localhost:3000/api/v1/movies`,
    });

    req.flush(mockResponse);
  });

  it("should call getNowPlayingMovieById and return the details of a movie", () => {
    const mockResponse = NOW_PLAYING_MOVIE_DETAILS;

    service
      .getNowPlayingMovieById(NOW_PLAYING_MOVIE_DETAILS._id)
      .subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

    const req = httpController.expectOne({
      method: "GET",
      url: `http://localhost:3000/api/v1/movies/${NOW_PLAYING_MOVIE_DETAILS._id}`,
    });

    req.flush(mockResponse);
  });

  it("should call updateNowPlayingMovie and return the details of a movie with the updated property", () => {
    const mockPayload = SHOWTIME_PAYLOAD;
    const mockResponse = NOW_PLAYING_MOVIE_DETAILS_UPDATED;

    service
      .updateNowPlayingMovie(NOW_PLAYING_MOVIE_DETAILS_UPDATED._id, mockPayload)
      .subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

    const req = httpController.expectOne({
      method: "PUT",
      url: `http://localhost:3000/api/v1/movies/${NOW_PLAYING_MOVIE_DETAILS_UPDATED._id}`,
    });

    req.flush(mockResponse);
  });
});
