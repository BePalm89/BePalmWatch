import { TestBed } from "@angular/core/testing";

import { ShowtimeService } from "./showtime.service";
import { BehaviorSubject } from "rxjs";
import dayjs from "dayjs";
import { SeatStatus } from "../enum/seat-status.enum";

describe("ShowtimeService", () => {
  let service: ShowtimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowtimeService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return the behavior Subject for showtime with the initial state", () => {
    const showtimeSubject = service.getShowtimeSubject();
    expect(showtimeSubject).toBeInstanceOf(BehaviorSubject);
    expect(showtimeSubject.value).toEqual({
      date: dayjs().format("ddd, DD.MM"),
      time: "16:00",
      totalPrice: 0,
    });
  });

  it("should return the current value for showtime with the initial state", () => {
    const showtimeSubject = service.getShowtime();
    expect(showtimeSubject).toEqual({
      date: dayjs().format("ddd, DD.MM"),
      time: "16:00",
      totalPrice: 0,
    });
  });

  it("should return an empty array of tickets initially", () => {
    const tickets = service.getTicket();
    expect(tickets).toEqual([]);
  });

  it("should update the showtime date", () => {
    // Given
    const newDate = "Fri, 20.09";

    // When
    service.updateDate(newDate);
    const updatedShowtime = service.getShowtime();

    // Then
    expect(updatedShowtime.date).toBe(newDate);
  });

  it("should update the showtime time", () => {
    // Given
    const newTime = "22:00";

    // When
    service.updateTime(newTime);
    const updatedShowtime = service.getShowtime();

    // Then
    expect(updatedShowtime.time).toBe(newTime);
  });

  it("should update the showtime price", () => {
    // Given
    const newPrice = 28.5;

    // When
    service.updatePrice(newPrice);
    const updatedShowtime = service.getShowtime();

    // Then
    expect(updatedShowtime.totalPrice).toBe(newPrice);
  });

  it("should reset the initial value of the showtime", () => {
    // Given
    service.updateDate("Fri, 20.09");
    service.updateTime("20:00");
    service.updatePrice(19.0);

    // When
    service.resetShowtime();
    const resetShowtime = service.getShowtime();
    //Then
    expect(resetShowtime).toEqual({
      date: dayjs().format("ddd, DD.MM"),
      time: "16:00",
      totalPrice: 0,
    });
  });

  it("should set the correct value for the tickets", () => {
    // Given
    const TICKETS = [
      {
        id: 1,
        row: 1,
        seat: 1,
        status: SeatStatus.AVAILABLE,
        date: "Fri, 20.09",
        time: "20:00",
        price: 9.5,
      },
      {
        id: 2,
        row: 1,
        seat: 2,
        status: SeatStatus.AVAILABLE,
        date: "Fri, 20.09",
        time: "20:00",
        price: 9.5,
      },
    ]

    

    // When
    service.setSelectedSeat(TICKETS);
    const updatedTickets = service.getTicket();
    //Then
    expect(updatedTickets).toEqual(TICKETS);
  });

  it("should reset the initial value of the tickets", () => {
    // Given
    service.setSelectedSeat([
      {
        id: 1,
        row: 1,
        seat: 1,
        status: SeatStatus.AVAILABLE,
        date: "Fri, 20.09",
        time: "20:00",
        price: 9.5,
      },
      {
        id: 2,
        row: 1,
        seat: 2,
        status: SeatStatus.AVAILABLE,
        date: "Fri, 20.09",
        time: "20:00",
        price: 9.5,
      },
    ]);

    // When
    service.resetTickets();
    const resetTickets = service.getTicket();
    //Then
    expect(resetTickets).toEqual([]);
  });
});
