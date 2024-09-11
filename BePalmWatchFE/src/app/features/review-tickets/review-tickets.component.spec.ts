import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTicketsComponent } from './review-tickets.component';

describe('ReviewTicketsComponent', () => {
  let component: ReviewTicketsComponent;
  let fixture: ComponentFixture<ReviewTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewTicketsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
