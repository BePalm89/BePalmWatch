import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CardComponent } from "./card.component";
import { MoviesService } from "../../../core/services/movies.service";
import { TvService } from "../../../core/services/tv.service";
import { Movie } from "../../../core/models/movie.model";
import { MediaTypeEnum } from "../../../core/enum/media-type.enum";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { provideRouter } from "@angular/router";
import { TvShow } from "../../../core/models/tvShow.model";
import { By } from "@angular/platform-browser";

describe("CardComponent", () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let movieService: MoviesService;
  let tvService: TvService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent, HttpClientTestingModule],
      providers: [provideRouter([])],
    }).compileComponents();

    movieService = TestBed.inject(MoviesService);
    tvService = TestBed.inject(TvService);
    httpController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.data = {
      title: "Test Movie",
      release_date: "2023-07-16",
      poster_path: "/path.jpg",
      id: 1,
      genres: ["Action", "Sci-fi"],
    } as Movie;
    component.type = MediaTypeEnum.MOVIE;

    fixture.detectChanges();
  });

  afterEach(() => {
    httpController.verify();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should return title when type is movie", () => {
    // Given
    const movie: Movie = {
      title: "title",
      release_date: "2024-07-16",
    } as Movie;

    // When
    component.data = movie;
    component.type = MediaTypeEnum.MOVIE;

    // Then
    expect(component.title).toEqual("title");
  });

  it("should return name when type is tv", () => {
    // Given
    const tvShow: TvShow = {
      name: "name",
      first_air_date: "2024-07-16",
    } as TvShow;

    // When
    component.data = tvShow;
    component.type = MediaTypeEnum.TV_SHOW;

    // Then
    expect(component.title).toEqual("name");
  });

  it("should return release date when type is movie", () => {
    // Given
    const movie: Movie = {
      title: "title",
      release_date: "2024-07-16",
    } as Movie;

    // When
    component.data = movie;
    component.type = MediaTypeEnum.MOVIE;

    // Then
    expect(component.releaseYear).toEqual("2024-07-16");
  });

  it("should return first air date when type is tv", () => {
    // Given
    const tvShow: TvShow = {
      name: "name",
      first_air_date: "2024-07-16",
    } as TvShow;

    // When
    component.data = tvShow;
    component.type = MediaTypeEnum.TV_SHOW;

    // Then
    expect(component.releaseYear).toEqual("2024-07-16");
  });

  it("should return the correct favorite icon in the template", () => {
    const movie: Movie = {
      title: "title",
      release_date: "2024-07-16",
    } as Movie;
    component.data = movie;
    component.type = MediaTypeEnum.TV_SHOW;

    fixture.detectChanges();

    let favoriteIcon = fixture.debugElement.query(
      By.css(".favorite-container img")
    ).nativeElement;
    expect(favoriteIcon.src).toContain("/assets/icons/like.png");

    favoriteIcon.click();

    const req = httpController.expectOne(
      "https://api.themoviedb.org/3/account/10346540/favorite?language=en-US"
    );
    expect(req.request.method).toBe("POST");

    req.flush({});

    fixture.detectChanges();

    favoriteIcon = fixture.debugElement.query(
      By.css(".favorite-container img")
    ).nativeElement;
    expect(favoriteIcon.src).toContain("/assets/icons/like-fill.png");
  });

  it("should call toggleFavorite and call movieService when type is movie", () => {
    // Given
    jest.spyOn(component["movieService"], "addFavorite").mockReturnValue({
      subscribe: jest.fn(),
    } as any);
    component.type = MediaTypeEnum.MOVIE;

    // When
    component.toggleFavorite(1);

    // Then
    expect(component["isFavorite"]).toBe(true);
    expect(movieService.addFavorite).toHaveBeenCalledWith({
      media_type: "movie",
      media_id: 1,
      favorite: true,
    });
  });

  it("should call toggleFavorite and call tvService when type is tv", () => {
    // Given
    jest.spyOn(component["tvShowService"], "addFavorite").mockReturnValue({
      subscribe: jest.fn(),
    } as any);
    component.type = MediaTypeEnum.TV_SHOW;

    // When
    component.toggleFavorite(1);

    // Then
    expect(component["isFavorite"]).toBe(true);
    expect(tvService.addFavorite).toHaveBeenCalledWith({
      media_type: "tv",
      media_id: 1,
      favorite: true,
    });
  });

  it("should return a successfull message when the add favorite is called", () => {
    // Given
    const consoleSpy = jest.spyOn(console, "log");
    jest.spyOn(component["movieService"], "addFavorite").mockReturnValue({
      subscribe: (callback: Function) => {
        callback(); // Manually invoke the callback to simulate a successful HTTP response
      },
    } as any);

    // When
    component.toggleFavorite(1);

    // Then
    expect(consoleSpy).toHaveBeenCalledWith("success movie");

    // Clean up the console spy
    consoleSpy.mockRestore();
  });

  it("should correctly display the image with the correct alt text", () => {
    const imgElement = fixture.debugElement.query(
      By.css(".card-img-container img")
    ).nativeElement;

    expect(imgElement.src).toContain(component.data.poster_path);
    expect(imgElement.alt).toBe(component.title);
  });

  it("should correctly display the title and the release year", () => {
    const titleElement = fixture.debugElement.query(
      By.css(".info-container h4")
    ).nativeElement;
    const releaseYearElement = fixture.debugElement.query(
      By.css(".details-container p")
    ).nativeElement;

    expect(titleElement.textContent).toBe(component.title);
    expect(releaseYearElement.textContent).toBe("2023");
  });

  it("should correctly display genres", () => {
    const genresElement = fixture.debugElement.queryAll(
      By.css(".genres-container p")
    );

    expect(genresElement.length).toBe(2);
    expect(genresElement[0].nativeElement.textContent).toContain("Action");
    expect(genresElement[1].nativeElement.textContent).toContain("Sci-fi");
  });

  it("should correctly navigate to the route clicking on view more button", () => {
    const viewMoreLink = fixture.debugElement.query(By.css("a")).nativeElement;
    expect(viewMoreLink.getAttribute("href")).toContain("/movie/1");
  });
});
