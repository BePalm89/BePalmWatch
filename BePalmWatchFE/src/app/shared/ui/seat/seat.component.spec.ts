import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatComponent } from './seat.component';
import { By } from '@angular/platform-browser';

describe('SeatComponent', () => {
  let component: SeatComponent;
  let fixture: ComponentFixture<SeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a seatSelected on seat click', () => {
    jest.spyOn(component.seatSelected, 'emit');

    const svg = fixture.debugElement.query(By.css('svg'));
    svg.triggerEventHandler('click', null);

    expect(component.seatSelected.emit).toHaveBeenCalled();
  });

  it('should apply the "non-clickable" class when color is "#F4000B"', () => {
    component.color = '#F4000B';
    fixture.detectChanges(); 

    const svg = fixture.debugElement.query(By.css('svg'));
    expect(svg.classes['non-clickable']).toBeTruthy();
  });

  it('should apply the "non-clickable" class when color is "#F4000B"', () => {
    component.color = '#00FF00';
    fixture.detectChanges(); 

    const svg = fixture.debugElement.query(By.css('svg'));
    expect(svg.classes['non-clickable']).toBeFalsy();
  });

  it('should set the color correctly on the svg elements', () => {
    const testColor = '#00FF00';
    component.color = testColor;
    fixture.detectChanges(); 

    
    const pathElements = fixture.debugElement.queryAll(By.css('path'));
    pathElements.forEach((path) => {
      expect(path.attributes['fill']).toBe(testColor);
    });
  });
});
