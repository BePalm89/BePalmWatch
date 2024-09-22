import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DetailsCardComponent } from "./details-card.component";
import { MatDialog } from "@angular/material/dialog";
import { Movie } from "../../../core/models/movie.model";
import { of } from "rxjs";
import { DialogSliderComponent } from "../dialog-slider/dialog-slider.component";
import { ShowtimeService } from "../../../core/services/showtime.service";
import { By } from "@angular/platform-browser";
import { DatePipe } from "@angular/common";
import { MediaTypeEnum } from "../../../core/enum/media-type.enum";

describe("DetailsCardComponent", () => {
  let component: DetailsCardComponent;
  let fixture: ComponentFixture<DetailsCardComponent>;
  let dialogMock: jest.Mocked<MatDialog>;
  let showtimeService: ShowtimeService;
  let datePipe: DatePipe;


  beforeEach(async () => {
    dialogMock = {
      open: jest.fn(),
    } as unknown as jest.Mocked<MatDialog>;

    await TestBed.configureTestingModule({
      imports: [DetailsCardComponent],
      providers: [{ provide: MatDialog, useValue: dialogMock }, DatePipe],
    }).compileComponents();

    showtimeService = TestBed.inject(ShowtimeService);
    datePipe = TestBed.inject(DatePipe);
    fixture = TestBed.createComponent(DetailsCardComponent);
    component = fixture.componentInstance;
    const mockMovie = {
      id: 1,
      title: "Mock movie",
      release_date: "2024-09-09",
      genres: ["Action", "Comedy"],
      original_language: 'English',
      overview: 'mock overview of the mock movie',
      homepage: 'https://homepage.com/'
    } as Movie;

    component.movieDetails = mockMovie;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should open the booking a seat modal with the correct data and call reset showtime and ticket method when the modal is closed", () => {


    jest.spyOn(showtimeService, "resetShowtime").mockImplementation(jest.fn());
    jest.spyOn(showtimeService, "resetTickets").mockImplementation(jest.fn());

    dialogMock.open.mockReturnValue({
      afterClosed: () => of(null),
    } as any);

    component.openBookSeatModal();

    fixture.detectChanges();

    expect(dialogMock.open).toHaveBeenCalled();
    expect(dialogMock.open).toHaveBeenCalledWith(DialogSliderComponent, {
      data: component.movieDetails,
    });

    expect(showtimeService.resetShowtime).toHaveBeenCalled();
    expect(showtimeService.resetTickets).toHaveBeenCalled();
  });

  it('should display the correct title', () => {
    const titleElement = fixture.debugElement.query(By.css('.details-header h1')).nativeElement;

    expect(titleElement.textContent).toBe(component.movieDetails?.title);
  });

  it('should display the correct release date', () => {
    const releaseDateElement = fixture.debugElement.query(By.css('.details-header h4')).nativeElement;

    const formattedDate = datePipe.transform(component.movieDetails?.release_date, 'dd/MM/yyyy');

    expect(releaseDateElement.textContent).toBe(formattedDate);
  });

  it('should display the correct genres', () => {
    const genresElement = fixture.debugElement.queryAll(By.css('.details-genres ul li'));

    expect(genresElement.length).toBe(2);
    expect(genresElement[0].nativeElement.textContent).toBe(component.movieDetails?.genres[0]);
    expect(genresElement[1].nativeElement.textContent).toBe(component.movieDetails?.genres[1]);
  });

  it('should display the correct original language', () => {
    const originalLanguageElement = fixture.debugElement.query(By.css('.details-language span')).nativeElement;

    expect(originalLanguageElement.textContent).toBe(component.movieDetails?.original_language);
  });

  it('should display the correct overview', () => {
    const originalLanguageElement = fixture.debugElement.query(By.css('.details-container p')).nativeElement;

    expect(originalLanguageElement.textContent).toBe(component.movieDetails?.overview);
  });

  it('should display the correct homepage if there is one', () => {
    const homepageElement = fixture.debugElement.query(By.css('.details-homepage a')).nativeElement;

    expect(homepageElement.textContent).toBe(component.movieDetails?.homepage);
    expect(homepageElement.href).toBe(component.movieDetails?.homepage);
  });

  it('should not display the homepage if there is not one', () => {
    const mockMovie = {
      id: 1,
      title: "Mock movie",
      release_date: "2024-09-09",
      genres: ["Action", "Comedy"],
      original_language: 'English',
      overview: 'mock overview of the mock movie',
    } as Movie;

    component.movieDetails = mockMovie;

    fixture.detectChanges();

    const homepageElement = fixture.debugElement.query(By.css('.details-homepage a'));

    expect(homepageElement).toBeFalsy();

  });

  it('should display the button book a seat if the type is now playing', () => {

    component.type = MediaTypeEnum.NOW_PLAYING;

    fixture.detectChanges();

    const bookSeatButton = fixture.debugElement.query(By.css('.details-cta button'));

    expect(bookSeatButton).toBeTruthy();
  
  });

  it('should not display the button book a seat if the type is movie', () => {

    component.type = MediaTypeEnum.MOVIE;

    fixture.detectChanges();

    const bookSeatButton = fixture.debugElement.query(By.css('.details-cta button'));

    expect(bookSeatButton).toBeFalsy();
  
  });


  it('should not display the button book a seat if the type is tv show', () => {

    component.type = MediaTypeEnum.TV_SHOW;

    fixture.detectChanges();

    const bookSeatButton = fixture.debugElement.query(By.css('.details-cta button'));

    expect(bookSeatButton).toBeFalsy();
  
  });


});
