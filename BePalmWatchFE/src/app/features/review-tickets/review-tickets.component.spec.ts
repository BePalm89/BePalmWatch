import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ReviewTicketsComponent } from "./review-tickets.component";
import { Movie } from "../../core/models/movie.model";
import { ShowtimeService } from "../../core/services/showtime.service";
import { SeatStatus } from "../../core/enum/seat-status.enum";

describe("ReviewTicketsComponent", () => {
  let component: ReviewTicketsComponent;
  let fixture: ComponentFixture<ReviewTicketsComponent>;
  let showtimeService: ShowtimeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewTicketsComponent],
    }).compileComponents();

    showtimeService = TestBed.inject(ShowtimeService);
    fixture = TestBed.createComponent(ReviewTicketsComponent);
    component = fixture.componentInstance;
    component.data = {
      title: "Test Movie",
      release_date: "2023-07-16",
      poster_path: "/path.jpg",
      id: 1,
      genres: ["Action", "Sci-fi"],
      original_language: "en",
    } as Movie;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should return the correct language", () => {
    const language = component.getLanguageName(
      component.data.original_language
    );
    expect(language).toBe("English");
  });

  it("should show the correct cost and call the showtime service with update price", () => {
    component.tickets = [
      {
        id: 1,
        row: 1,
        seat: 1,
        status: SeatStatus.OCCUPIED,
        date: "2024-09-25",
        time: "16:00",
        price: 9.5,
      },
      {
        id: 2,
        row: 1,
        seat: 2,
        status: SeatStatus.OCCUPIED,
        date: "2024-09-25",
        time: "16:00",
        price: 9.5,
      },
    ];
    
    jest.spyOn(showtimeService, "updatePrice").mockImplementation(jest.fn());

    const totalCost = component.getTotalCost();

    fixture.detectChanges();

    expect(totalCost).toBe(19);
    expect(showtimeService.updatePrice).toHaveBeenCalledWith(19);


  });
});
