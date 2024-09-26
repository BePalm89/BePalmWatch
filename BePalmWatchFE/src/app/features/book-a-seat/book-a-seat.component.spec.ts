import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BookASeatComponent } from "./book-a-seat.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import dayjs from "dayjs";
import { SeatStatus } from "../../core/enum/seat-status.enum";
import { ShowtimeService } from "../../core/services/showtime.service";
import { Showtime, Ticket } from "../../core/models/showtime.model";
import { Seat } from "../../core/models/seat.model";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { ChangeDetectorRef } from "@angular/core";
import { BehaviorSubject } from "rxjs";

describe("BookASeatComponent", () => {
  let component: BookASeatComponent;
  let fixture: ComponentFixture<BookASeatComponent>;
  let showtimeService: ShowtimeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookASeatComponent, NoopAnimationsModule],
    }).compileComponents();

    showtimeService = TestBed.inject(ShowtimeService);
    fixture = TestBed.createComponent(BookASeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have generate 5 days when loading the component", () => {
    const fiveDayInTheFuture = dayjs().add(4, "day");

    expect(component.tabTitles.length).toBe(5);
    expect(component.tabTitles[0]).toBe(dayjs().format("ddd, DD/MM"));
    expect(component.tabTitles[component.tabTitles.length - 1]).toBe(
      fiveDayInTheFuture.format("ddd, DD/MM")
    );
  });

  it("should hasSelectedSeat emit true and set the selected seat in the showtimeService when called onSelectedSeatChange", () => {
    jest.spyOn(component.hasSelectedSeat, "emit");
    jest
      .spyOn(showtimeService, "setSelectedSeat")
      .mockImplementation(jest.fn());
    const showtimeMock = jest
      .spyOn(showtimeService, "getShowtime")
      .mockReturnValue({ time: "16:00", date: "2024-06-25", totalPrice: 0 });

    // Given
    const selectedSeats: Seat[] = [
      { id: 1, row: 1, seat: 1, status: SeatStatus.SELECTED },
      { id: 2, row: 1, seat: 2, status: SeatStatus.SELECTED },
    ];

    // When
    component.onSelectedSeatChange(selectedSeats);

    fixture.detectChanges();

    const showtimeDetails = showtimeMock.mock.results[0].value;

    const tickets: Ticket[] = selectedSeats.map((seat: any) => {
      return {
        ...seat,
        time: showtimeDetails.time,
        date: showtimeDetails.date,
        price: 9.5,
      };
    });

    // Then
    expect(component.hasSelectedSeat.emit).toHaveBeenCalledWith(true);
    expect(showtimeService.setSelectedSeat).toHaveBeenCalledWith(tickets);
  });

  it("should hasSelectedSeat emit false and set the selected seat in the showtimeService when called onSelectedSeatChange", () => {
    jest.spyOn(component.hasSelectedSeat, "emit");
    jest
      .spyOn(showtimeService, "setSelectedSeat")
      .mockImplementation(jest.fn());

    // Given
    const selectedSeats: Seat[] = [];

    // When
    component.onSelectedSeatChange(selectedSeats);

    fixture.detectChanges();

    const tickets: Ticket[] = [];

    // Then
    expect(component.hasSelectedSeat.emit).toHaveBeenCalledWith(false);
    expect(showtimeService.setSelectedSeat).toHaveBeenCalledWith(tickets);
  });

  it("should set the right day from the showtime service", () => {
    jest
      .spyOn(showtimeService, "getShowtime")
      .mockReturnValue({ time: "16:00", date: "2024-09-25", totalPrice: 0 });

    component.tabGroup = {
      selectedIndex: null,
    } as any;

    component.tabTitles = ["2024-09-24", "2024-09-25", "2024-09-26"];

    component.ngAfterViewInit();

    fixture.detectChanges();

    expect(component.tabGroup.selectedIndex).toBe(1);
  });

  it("should not set the tab group if the date is not found in tabTitles", () => {
    jest
      .spyOn(showtimeService, "getShowtime")
      .mockReturnValue({ time: "16:00", date: "2024-09-29", totalPrice: 0 });

    component.tabGroup = {
      selectedIndex: null,
    } as any;

    component.tabTitles = ["2024-09-24", "2024-09-25", "2024-09-26"];

    component.ngAfterViewInit();

    fixture.detectChanges();

    expect(component.tabGroup.selectedIndex).toBeNull();
  });

  it("should update correctly the date in the showtime service", () => {
    jest.spyOn(showtimeService, "updateDate").mockImplementation(jest.fn());
    const detectChangesSpy = jest.spyOn(
      Object.getOwnPropertyDescriptor(component, "cd")?.value,
      "detectChanges"
    );

    const event: MatTabChangeEvent = {
      index: 1,
      tab: {
        textLabel: "2024-09-25",
      },
    } as any;

    component.selectedTabValue(event);

    fixture.detectChanges();

    expect(showtimeService.updateDate).toHaveBeenCalledWith("2024-09-25");
    expect(detectChangesSpy).toHaveBeenCalled();
  });

  it("should correctly handle showtime changes and update seat selections", () => {
    const mockShowtimeSubject = new BehaviorSubject<Showtime>({
      date: "2024-09-25",
      time: "16:00",
      totalPrice: 0,
    });

    jest
      .spyOn(showtimeService, "getShowtimeSubject")
      .mockReturnValue(mockShowtimeSubject);

    const mockTickets = [
      { id: 1, date: "2024-09-25", time: "16:00", price: 9.5 } as Ticket,
      { id: 2, date: "2024-09-25", time: "16:00", price: 9.5 } as Ticket,
    ];
    jest.spyOn(showtimeService, "getTicket").mockReturnValue(mockTickets);

    const setSelectedSeatSpy = jest.spyOn(showtimeService, "setSelectedSeat");
    const hasSelectedSeatEmitSpy = jest.spyOn(
      component.hasSelectedSeat,
      "emit"
    );

    component.ngAfterViewInit();

    fixture.detectChanges();

    mockShowtimeSubject.next({
      date: "2024-09-25",
      time: "16:00",
      totalPrice: 0,
    });

    fixture.detectChanges();

    expect(hasSelectedSeatEmitSpy).toHaveBeenCalledWith(true); // Emit true
    expect(component.selectedSeatsList).toEqual(mockTickets); // selectedSeatsList should be updated with the tickets
    expect(setSelectedSeatSpy).not.toHaveBeenCalledWith([]); // No clearing of seats

    const unmatchedTickets = [
      { id: 1, date: "2024-09-24", time: "16:00", price: 9.5 } as Ticket,
    ];
    jest.spyOn(showtimeService, "getTicket").mockReturnValue(unmatchedTickets);

    mockShowtimeSubject.next({ date: "2024-09-25", time: "18:00", totalPrice: 0 });

    fixture.detectChanges();

    expect(hasSelectedSeatEmitSpy).toHaveBeenCalledWith(false); 
    expect(component.selectedSeatsList).toEqual([]); 
    expect(setSelectedSeatSpy).toHaveBeenCalledWith([]); 
  });
});
