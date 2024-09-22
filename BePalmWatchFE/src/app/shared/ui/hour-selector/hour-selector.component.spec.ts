import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HourSelectorComponent } from "./hour-selector.component";
import { ShowtimeService } from "../../../core/services/showtime.service";
import { By } from "@angular/platform-browser";

describe("HourSelectorComponent", () => {
  let component: HourSelectorComponent;
  let fixture: ComponentFixture<HourSelectorComponent>;
  let showtimeService: ShowtimeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HourSelectorComponent],
    }).compileComponents();

    showtimeService = TestBed.inject(ShowtimeService);
    fixture = TestBed.createComponent(HourSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display the correct number of hours", () => {
    const divElement = fixture.nativeElement.querySelectorAll(
      ".hours-container div"
    );

    expect(divElement.length).toBe(component.HOURS.length);
  });

  it("should set the correct hour when select a particular hour and call the showtime service", () => {
    // Given
    jest.spyOn(showtimeService, "updateTime").mockImplementation(jest.fn());

    // When
    component.onSelectHour("20:00");

    fixture.detectChanges();

    expect(component.selectedHour).toBe("20:00");
    expect(showtimeService.updateTime).toHaveBeenCalledWith("20:00");
  });

  it("should set the correct hour and the right style when an hour is selected", () => {
    // Given
    const hourToSelect = "22:00";

    // When

    component.onSelectHour(hourToSelect);
    fixture.detectChanges();

    const hourElement = fixture.debugElement.queryAll(
      By.css(".hours-container div")
    );

    const selectedElement = hourElement.find((el) => {
      return el.nativeElement.textContent.trim() === hourToSelect;
    });

    // Then
    expect(selectedElement).toBeTruthy();
    expect(component.selectedHour).toBe("22:00");
    expect(selectedElement?.nativeElement.classList).toContain('selected');
  });
});
