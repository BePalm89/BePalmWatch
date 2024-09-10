import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookASeatComponent } from './book-a-seat.component';

describe('BookASeatComponent', () => {
  let component: BookASeatComponent;
  let fixture: ComponentFixture<BookASeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookASeatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookASeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
