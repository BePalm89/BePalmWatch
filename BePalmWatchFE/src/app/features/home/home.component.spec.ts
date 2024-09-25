import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HomeComponent } from "./home.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MoviesService } from "../../core/services/movies.service";
import { GenreService } from "../../core/services/genre.service";
import { of } from "rxjs";
import { provideRouter } from "@angular/router";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let genreService: GenreService;
  let movieService: MoviesService;

  const mockMovies = {
    results: [
      { id: 1, title: "Movie1" },
      { id: 2, title: "Movie2" },
    ],
  };
  const mockGenres = [
    { id: 1, name: "Action" },
    { id: 2, name: "Drama" },
  ];

  beforeEach(async () => {
    const movieServiceMock = {
      getMovies: jest.fn().mockReturnValue(of(mockMovies)),
    };

    const genreServiceMock = {
      getGenreMovie: jest.fn().mockReturnValue(mockGenres),
    };

    await TestBed.configureTestingModule({
      imports: [HomeComponent, HttpClientTestingModule],
      providers: [
        { provide: MoviesService, useValue: movieServiceMock },
        { provide: GenreService, useValue: genreServiceMock },
        provideRouter([])
      ],
      
    }).compileComponents();

    movieService = TestBed.inject(MoviesService);
    genreService = TestBed.inject(GenreService);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it('should call getMovies and getGenreMovie on init', () => {

    expect(genreService.getGenreMovie).toHaveBeenCalled();
    expect(movieService.getMovies).toHaveBeenCalled();

  });
});
