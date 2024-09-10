import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatAreaComponent } from './seat-area.component';

describe('SeatAreaComponent', () => {
  let component: SeatAreaComponent;
  let fixture: ComponentFixture<SeatAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeatAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeatAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
