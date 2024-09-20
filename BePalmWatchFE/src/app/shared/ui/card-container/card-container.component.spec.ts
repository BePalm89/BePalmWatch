import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CardContainerComponent } from "./card-container.component";
import { Movie } from "../../../core/models/movie.model";
import { MediaTypeEnum } from "../../../core/enum/media-type.enum";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { provideRouter } from "@angular/router";
import { By } from "@angular/platform-browser";

describe("CardContainerComponent", () => {
  let component: CardContainerComponent;
  let fixture: ComponentFixture<CardContainerComponent>;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardContainerComponent, HttpClientTestingModule],
      providers: [provideRouter([])],
    }).compileComponents();

    httpController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(CardContainerComponent);
    component = fixture.componentInstance;
    component.data = [
      { id: 1, title: "movie 1" } as Movie,
      { id: 2, title: "movie 2" } as Movie,
    ];

    component.type = MediaTypeEnum.MOVIE;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpController.verify();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render a card for each media item in data", () => {
    const cardElement = fixture.nativeElement.querySelectorAll("app-card");
    expect(cardElement.length).toBe(2);
  });

  it('should pass the correct data and type to app-card', () => {
    const mediaItem = { title: 'Movie 1', id: 1 } as Movie;
    component.data = [mediaItem];
    component.type = MediaTypeEnum.MOVIE;
    
    fixture.detectChanges(); 
    
    const cardComponent = fixture.debugElement.queryAll(By.css('app-card'))[0].componentInstance;
  
    expect(cardComponent.data).toBe(mediaItem);
    expect(cardComponent.type).toBe(MediaTypeEnum.MOVIE);
  });
});
