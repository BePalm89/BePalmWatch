import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MainLayoutComponent } from "./main-layout.component";
import { GenreService } from "../../services/genre.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { RouterOutlet, RouterModule, provideRouter} from "@angular/router";
import { SideNavComponent } from "../side-nav/side-nav.component";
import { FooterComponent } from "../footer/footer.component";
import { TopBarComponent } from "../top-bar/top-bar.component";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GENRE_MOVIE, GENRE_TV_SHOW } from "../../mocks/genre.mock";
import { of } from "rxjs";

describe("MainLayoutComponent", () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;
  let genreService: GenreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MainLayoutComponent,
        HttpClientTestingModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        RouterOutlet,
        RouterModule,
        TopBarComponent,
        FooterComponent,
        SideNavComponent,
      ],
      providers: [provideRouter([])],
    }).compileComponents();
    
    genreService = TestBed.inject(GenreService);
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchGenreMovies and fetchGenreTvShows when loading the component', () => {
    // Given
    jest.spyOn(genreService, 'fetchGenreMovies').mockReturnValue(of(GENRE_MOVIE));
    jest.spyOn(genreService, 'fetchGenreTvShows').mockReturnValue(of(GENRE_TV_SHOW));

    jest.spyOn(genreService, 'setGenreMovie').mockImplementation(jest.fn());
    jest.spyOn(genreService, 'setGenreTvShow').mockImplementation(jest.fn());

    // When
    component.ngOnInit();

    // Then
    expect(genreService.fetchGenreMovies).toHaveBeenCalled();
    expect(genreService.fetchGenreTvShows).toHaveBeenCalled();

    expect(genreService.setGenreMovie).toHaveBeenCalledWith(GENRE_MOVIE);
    expect(genreService.setGenreTvShow).toHaveBeenCalledWith(GENRE_TV_SHOW);


  })
});
