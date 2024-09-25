import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavouritesComponent } from './favourites.component';
import { GenreService } from '../../core/services/genre.service';
import { MoviesService } from '../../core/services/movies.service';
import { TvService } from '../../core/services/tv.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { mapMediaWithGenres } from '../../shared/utility/utils';

describe('FavouritesComponent', () => {
  let component: FavouritesComponent;
  let fixture: ComponentFixture<FavouritesComponent>;
  let genreService: GenreService;
  let movieService: MoviesService;
  let tvService: TvService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouritesComponent, HttpClientTestingModule],
      providers: [provideRouter([])],
    }).compileComponents();

    genreService = TestBed.inject(GenreService);
    movieService = TestBed.inject(MoviesService);
    tvService = TestBed.inject(TvService);
    fixture = TestBed.createComponent(FavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchGenreMovies and fetchGenreTvShows when loading the component', () => {
    // Given
    jest.spyOn(genreService, 'getGenreMovie').mockImplementation(() => ({}));  // Mocking empty object or actual genre data
    jest.spyOn(genreService, 'getGenreTvShow').mockImplementation(() => ({}));

    // When
    component.ngOnInit();

    // Then
    expect(genreService.getGenreMovie).toHaveBeenCalled();
    expect(genreService.getGenreTvShow).toHaveBeenCalled();
  });

  it('should populate favoriteMovies and favoriteTvShow correctly when services return data', () => {
    // Given
    const mockMovieGenres = { 1: 'Action', 2: 'Drama' }; // Mock genre data
    const mockTvGenres = { 3: 'Comedy', 4: 'Documentary' };
    const mockFavoriteMovies = { results: [{ id: 1, genre_ids: [1, 2] }] }; // Mocked movie data
    const mockFavoriteTvShows = { results: [{ id: 2, genre_ids: [3] }] }; // Mocked tv show data

    jest.spyOn(genreService, 'getGenreMovie').mockReturnValue(mockMovieGenres);
    jest.spyOn(genreService, 'getGenreTvShow').mockReturnValue(mockTvGenres);
    jest.spyOn(movieService, 'getFavoriteMovies').mockReturnValue(of(mockFavoriteMovies));
    jest.spyOn(tvService, 'getFavoriteTvShow').mockReturnValue(of(mockFavoriteTvShows));

    // When
    component.ngOnInit();

    // Then
    expect(component.favoriteMovies).toEqual(
      mapMediaWithGenres(mockFavoriteMovies.results, mockMovieGenres)
    );
    expect(component.favoriteTvShow).toEqual(
      mapMediaWithGenres(mockFavoriteTvShows.results, mockTvGenres)
    );
  });
});
