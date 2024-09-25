import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvComponent } from './tv.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TvService } from '../../core/services/tv.service';
import { of } from 'rxjs';
import { GenreService } from '../../core/services/genre.service';
import { provideRouter } from '@angular/router';

describe('TvComponent', () => {
  let component: TvComponent;
  let fixture: ComponentFixture<TvComponent>;
  let tvService: TvService;
  let genreService: GenreService;

  const mockTvShows = { results: [{ id: 1, name: 'Show1' }, { id: 2, name: 'Show2' }] };
  const mockGenres = [{ id: 1, name: 'Action' }, { id: 2, name: 'Drama' }];

  beforeEach(async () => {

    const tvServiceMock = {
      getTVShows: jest.fn().mockReturnValue(of(mockTvShows))
    };

    const genreServiceMock = {
      getGenreTvShow: jest.fn().mockReturnValue(mockGenres)
    };


    await TestBed.configureTestingModule({
      imports: [TvComponent, HttpClientTestingModule],
      providers: [
        { provide: TvService, useValue: tvServiceMock },
        { provide: GenreService, useValue: genreServiceMock },
        provideRouter([])
      ],
    })
    .compileComponents();
    
    tvService = TestBed.inject(TvService);
    genreService = TestBed.inject(GenreService);
    fixture = TestBed.createComponent(TvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call getTVShows and getGenreTvShow on init and set tvShows', () => {

    expect(genreService.getGenreTvShow).toHaveBeenCalled();
    expect(tvService.getTVShows).toHaveBeenCalled();

  });
});
