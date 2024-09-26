import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DetailsMovieComponent } from "./details-movie.component";
import { MoviesService } from "../../core/services/movies.service";
import { of } from "rxjs";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRoute, provideRouter } from "@angular/router";
import { MediaTypeEnum } from "../../core/enum/media-type.enum";
import { TvService } from "../../core/services/tv.service";
import { NowPlayingService } from "../../core/services/now-playing.service";
import { Movie } from "../../core/models/movie.model";

describe("DetailsMovieComponent", () => {
  let component: DetailsMovieComponent;
  let fixture: ComponentFixture<DetailsMovieComponent>;
  let movieService: MoviesService;
  let tvService: TvService;
  let nowPlayingService: NowPlayingService;

  const mockMovieDetails = { title: "Title" };
  const mockTvShowDetails = { name: "Title" };

  beforeEach(async () => {
    const movieServiceMock = {
      getDetailsMovie: jest.fn().mockReturnValue(of(mockMovieDetails)),
    };

    const tvServiceMock = {
      getDetailsTvShow: jest.fn().mockReturnValue(of(mockTvShowDetails)),
    };

    const nowPlayingServiceMock = {
      getNowPlayingMovieById: jest.fn().mockReturnValue(of(mockMovieDetails))
    }


    await TestBed.configureTestingModule({
      imports: [DetailsMovieComponent, HttpClientTestingModule],
      providers: [
        { provide: MoviesService, useValue: movieServiceMock },
        { provide: TvService, useValue: tvServiceMock },
        { provide: NowPlayingService, useValue:  nowPlayingServiceMock},
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: jest.fn().mockReturnValue('1'),
              },
            },
          },
        }, 
      ],
    }).compileComponents();

    movieService = TestBed.inject(MoviesService);
    tvService = TestBed.inject(TvService);
    nowPlayingService = TestBed.inject(NowPlayingService);
    fixture = TestBed.createComponent(DetailsMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it('should call getMovieDetails when the type is movie', async () => {
    component.type = MediaTypeEnum.MOVIE;
    
    fixture.detectChanges();

    component.ngOnInit();

    
    fixture.detectChanges();
    await fixture.whenStable();
  
    expect(movieService.getDetailsMovie).toHaveBeenCalledWith(1);

  });

  it('should call getDetailsTvShow when the type is tv show', async () => {
    component.type = MediaTypeEnum.TV_SHOW;
    
    fixture.detectChanges();

    component.ngOnInit();

    
    fixture.detectChanges();
    await fixture.whenStable();
  
    expect(tvService.getDetailsTvShow).toHaveBeenCalledWith(1);

  });

  it('should call getNowPlayingMovieById when the type is tv now playing', async () => {
    component.type = MediaTypeEnum.NOW_PLAYING;
    
    fixture.detectChanges();

    component.ngOnInit();

    
    fixture.detectChanges();
    await fixture.whenStable();
  
    expect(nowPlayingService.getNowPlayingMovieById).toHaveBeenCalledWith("1");

  });

  it('should set the correct language', () => {
    component.movieDetails = {
      title: "Test Movie",
      release_date: "2023-07-16",
      poster_path: "/path.jpg",
      id: 1,
      genres: ["Action", "Sci-fi"],
      original_language: "en",
    } as Movie;

    fixture.detectChanges();

    const language = component.getLanguageName(
      component.movieDetails.original_language
    );
    expect(language).toBe("English");
  })
});

