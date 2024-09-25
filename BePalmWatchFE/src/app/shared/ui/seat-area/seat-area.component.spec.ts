import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SeatAreaComponent } from "./seat-area.component";
import { Seat } from "../../../core/models/seat.model";
import { SeatStatus } from "../../../core/enum/seat-status.enum";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SimpleChange, SimpleChanges } from "@angular/core";

describe("SeatAreaComponent", () => {
  let component: SeatAreaComponent;
  let fixture: ComponentFixture<SeatAreaComponent>;
  let snackbarMock: jest.Mocked<MatSnackBar>;

  beforeEach(async () => {
    snackbarMock = {
      open: jest.fn(),
    } as unknown as jest.Mocked<MatSnackBar>;

    jest.spyOn(window, "getComputedStyle").mockImplementation(
      () =>
        ({
          getPropertyValue: (property: string) => {
            switch (property) {
              case "--occupied-color":
                return "red";
              case "--tertiary-color":
                return "pink";
              default:
                return "green";
            }
          },
        } as CSSStyleDeclaration)
    );

    await TestBed.configureTestingModule({
      imports: [SeatAreaComponent, NoopAnimationsModule],
      providers: [{ provide: MatSnackBar, useValue: snackbarMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(SeatAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should correctly generate the seats", () => {
    const ROWS_NUMBER = 11;
    const SEAT_NUMBER_PER_ROW = 5;

    component.ngOnInit();

    fixture.detectChanges();

    expect(component.seatRows.length).toBe(ROWS_NUMBER);
    component.seatRows.forEach((row) => {
      expect(row.length).toBe(SEAT_NUMBER_PER_ROW * 2 + 1);
    });
  });

  it("should mark correctly the occupied seats", () => {
    const occupiedSeats: Seat[] = [
      { id: 1, row: 1, seat: 1, status: SeatStatus.AVAILABLE },
      { id: 2, row: 1, seat: 2, status: SeatStatus.AVAILABLE },
    ];

    component.ngOnInit();
    fixture.detectChanges();

    component.occupiedSeats.next(occupiedSeats);
    fixture.detectChanges();

    expect(component.seatRows[0][0].status).toBe(SeatStatus.OCCUPIED);
    expect(component.seatRows[0][1].status).toBe(SeatStatus.OCCUPIED);
  });

  it("should select an available seat and change the status to selected", () => {
    const seat = component.seatRows[0][0];

    component.onSelectedSeat(seat.id);

    fixture.detectChanges();

    expect(component.selectedSeatsList.length).toBe(1);
    expect(
      component.selectedSeatsList.every(
        (seat) => seat.status === SeatStatus.SELECTED
      )
    ).toBe(true);
  });

  it("should emit selectedSeatsListChange when a seat is selected", () => {
    jest.spyOn(component.selectedSeatsListChange, "emit");

    const seat = component.seatRows[0][0];

    component.onSelectedSeat(seat.id);

    fixture.detectChanges();

    expect(component.selectedSeatsListChange.emit).toHaveBeenCalled();
    expect(component.selectedSeatsListChange.emit).toHaveBeenCalledWith(
      component.selectedSeatsList
    );
  });

  it("should prevent selecting more than 6 seats and show a snackbar", () => {
    for (let i = 0; i < 6; i++) {
      const seats = component.seatRows[Math.floor(i / 2)][i % 2];

      component.onSelectedSeat(seats.id);
    }

    expect(component.selectedSeatsList.length).toBe(6);

    const seat = component.seatRows[4][0];

    component.onSelectedSeat(seat.id);

    expect(component.seatRows[4][0].status).toBe(SeatStatus.AVAILABLE);
    expect(component.selectedSeatsList.length).toBe(6);
    expect(snackbarMock.open).toHaveBeenCalledWith(
      "You can only select up to 6 seats.",
      "Close",
      {
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 3000,
      }
    );
  });

  it("should set the status to available if the seat was already selected", () => {
    component.selectedSeatsList = [
      { id: 1, row: 1, seat: 1, status: SeatStatus.SELECTED },
      { id: 2, row: 1, seat: 2, status: SeatStatus.SELECTED },
      { id: 3, row: 1, seat: 3, status: SeatStatus.SELECTED },
    ];

    jest.spyOn(component.selectedSeatsListChange, "emit");
    const seat = component.seatRows[0][0];

    component.onSelectedSeat(seat.id);

    component.onSelectedSeat(seat.id);

    fixture.detectChanges();

    expect(component.selectedSeatsList.length).toBe(2);
    expect(component.selectedSeatsListChange.emit).toHaveBeenCalledWith(
      component.selectedSeatsList
    );
  });

  it("should return the correct color when the status is available", () => {
    const color = component.getColor(SeatStatus.AVAILABLE);

    expect(color).toBe("green");
  });

  it("should return the correct color when the status is occupied", () => {
    const color = component.getColor(SeatStatus.OCCUPIED);

    expect(color).toBe("red");
  });

  it("should return the correct color when the status is selected", () => {
    const color = component.getColor(SeatStatus.SELECTED);

    expect(color).toBe("pink");
  });

  it("should call clearSelectedSeats and handleStatusSeat when the selectedSeatsList changes", () => {
    const seats = [
      { id: 1, row: 1, seat: 1, status: SeatStatus.AVAILABLE },
      { id: 2, row: 1, seat: 2, status: SeatStatus.AVAILABLE },
      { id: 3, row: 1, seat: 3, status: SeatStatus.AVAILABLE },
    ];

    fixture.detectChanges();

    const changes: SimpleChanges = {
      selectedSeatsList: new SimpleChange(null, seats, true),
    };

    component.ngOnChanges(changes);

    fixture.detectChanges();

    expect(component.seatRows[0][0].status).toBe(SeatStatus.SELECTED);
    expect(component.seatRows[0][1].status).toBe(SeatStatus.SELECTED);
    expect(component.seatRows[0][2].status).toBe(SeatStatus.SELECTED);
  });

  it("should clear selected seats before updating", () => {
    const seats: Seat[] = [
      { id: 3, row: 1, seat: 3, status: SeatStatus.SELECTED },
    ];

    fixture.detectChanges();

    const changes: SimpleChanges = {
      selectedSeatsList: new SimpleChange(null, seats, true),
    };

    component.ngOnChanges(changes);
    fixture.detectChanges();

    expect(component.seatRows[0][0].status).toBe(SeatStatus.AVAILABLE);
  });
});
