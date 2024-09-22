import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SelectedSeatsComponent } from "./selected-seats.component";
import { By } from "@angular/platform-browser";
import { SeatStatus } from "../../../core/enum/seat-status.enum";

describe("SelectedSeatsComponent", () => {
  let component: SelectedSeatsComponent;
  let fixture: ComponentFixture<SelectedSeatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedSeatsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectedSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display the right text when selected seat is an empty array", () => {
    const emptySeatElement = fixture.debugElement.query(
      By.css('[data-test="no-seats"')
    ).nativeElement;

    expect(emptySeatElement.textContent).toBe(
      "Selection of seats ( maximum: 6 )"
    );
  });

  it("should display the correct seats with the right row and seat number", () => {
    component.selectedSeatsList = [
      { row: 1, seat: 1, status: SeatStatus.SELECTED, id: 1 },
      { row: 1, seat: 2, status: SeatStatus.SELECTED, id: 2 },
    ];

    fixture.detectChanges();

    const seatsElement = fixture.debugElement.queryAll(By.css('.selected-seats-info'));
    const rowElements = fixture.debugElement.queryAll(By.css('[data-test="seat-row"]'));
    const seatNumberElements = fixture.debugElement.queryAll(By.css('[data-test="seat-seat"]'));


    expect(seatsElement.length).toBe(component.selectedSeatsList.length);
    expect(Number(rowElements[0].nativeElement.textContent)).toBe(component.selectedSeatsList[0].row);
    expect(Number(rowElements[1].nativeElement.textContent)).toBe(component.selectedSeatsList[1].row);
    expect(Number(seatNumberElements[1].nativeElement.textContent)).toBe(component.selectedSeatsList[1].seat);
    expect(Number(seatNumberElements[1].nativeElement.textContent)).toBe(component.selectedSeatsList[1].seat);

  });
});
