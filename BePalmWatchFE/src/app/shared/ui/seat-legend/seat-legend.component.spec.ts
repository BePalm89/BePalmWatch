import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatLegendComponent } from './seat-legend.component';

describe('SeatLegendComponent', () => {
  let component: SeatLegendComponent;
  let fixture: ComponentFixture<SeatLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeatLegendComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeatLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of seat for the legend', () => {

    const seatElement = fixture.nativeElement.querySelectorAll('app-seat');

    expect(seatElement.length).toBe(component.LEGEND_SEAT.length);

  });

  it('should set the correct label', () => {
    const labelElement = fixture.nativeElement.querySelectorAll('.legend-container p');

    expect(labelElement[0].textContent).toBe(component.LEGEND_SEAT[0].label);
    expect(labelElement[1].textContent).toBe(component.LEGEND_SEAT[1].label);
    expect(labelElement[2].textContent).toBe(component.LEGEND_SEAT[2].label);
  })
});
