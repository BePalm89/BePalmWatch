import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSliderComponent } from './dialog-slider.component';

describe('DialogSliderComponent', () => {
  let component: DialogSliderComponent;
  let fixture: ComponentFixture<DialogSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
