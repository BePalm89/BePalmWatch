import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesComponent } from './favourites.component';
import { GenreService } from '../../core/services/genre.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('FavouritesComponent', () => {
  let component: FavouritesComponent;
  let fixture: ComponentFixture<FavouritesComponent>;
  let genreService: GenreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouritesComponent, HttpClientTestingModule],
      providers: [provideRouter([])],
    })
    .compileComponents();

    genreService = TestBed.inject(GenreService);
    fixture = TestBed.createComponent(FavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchGenreMovies and fetchGenreTvShows when loading the component', () => {
    // Given
    jest.spyOn(genreService, 'getGenreMovie').mockImplementation(jest.fn());
    jest.spyOn(genreService, 'getGenreTvShow').mockImplementation(jest.fn());

    // When
    component.ngOnInit();

    // Then
    expect(genreService.getGenreMovie).toHaveBeenCalled();
    expect(genreService.getGenreTvShow).toHaveBeenCalled();

  })
});
