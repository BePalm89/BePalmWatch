import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { DialogSliderComponent } from "./dialog-slider.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { By } from "@angular/platform-browser";

describe("DialogSliderComponent", () => {
  let component: DialogSliderComponent;
  let fixture: ComponentFixture<DialogSliderComponent>;
  let matDialogRefMock: jest.Mocked<MatDialogRef<DialogSliderComponent>>;

  beforeEach(async () => {
    matDialogRefMock = {
      close: jest.fn(),
    } as unknown as jest.Mocked<MatDialogRef<DialogSliderComponent>>;

    await TestBed.configureTestingModule({
      imports: [
        DialogSliderComponent,
        MatDialogModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefMock }, 
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should close the dialog when onClose is called", () => {
    component.onClose();

    expect(matDialogRefMock.close).toHaveBeenCalled();
  });

  it("should increase the number of step when using onNextStep method", () => {
    // Given
    component.currentStep = 2;

    // When
    component.onNextStep();

    fixture.detectChanges();

    // Then
    expect(component.currentStep).toBe(3);
  });

  it("should decrease the number of step when using onPrevStep method", () => {
    // Given
    component.currentStep = 2;

    // When
    component.onPrevStep();

    fixture.detectChanges();

    // Then
    expect(component.currentStep).toBe(1);
  });

  it('should update ready to pay property when using the updateMovieAndPay', () => {
    component.updateMovieAndPay();

    fixture.detectChanges();

    expect(component.readyToPay.value).toBe(true);
  });

  it('should set correctly is form valid when calling onFormValid method', () => {
    component.isFormValid = true;

    component.onFormValid(false);

    fixture.detectChanges();

    expect(component.isFormValid).toBe(false);
  });

  it('should set the variable canGoToReviewPage correctly when calling onHasSelectedSeat method', () => {
    component.onHasSelectedSeat(false);

    expect(component.canGoToReviewPage).toBe(false);
  });

  it('should display the correct header, component and button when current step is equal to 1', () => {
    const headerElement = fixture.debugElement.query(By.css('.dialog-container h2')).nativeElement;
    const bookASeatComponent = fixture.debugElement.query(By.css("app-book-a-seat"));
    const buttonElement = fixture.debugElement.queryAll(By.css('.cta-container button'));
    
    expect(headerElement.textContent).toBe('Get the places you want to watch the movie!');
    expect(bookASeatComponent).toBeTruthy();
    expect(buttonElement[0].nativeElement.textContent).toBe('Cancel');
    expect(buttonElement[1].nativeElement.textContent).toBe('Review');
  });

  it('should display the correct header, component and button when current step is equal to 2', () => {
    component.currentStep = 2;
    
    fixture.detectChanges();

    const headerElement = fixture.debugElement.query(By.css('.dialog-container h2')).nativeElement;
    const bookASeatComponent = fixture.debugElement.query(By.css("app-review-tickets"));
    const buttonElement = fixture.debugElement.queryAll(By.css('.cta-container button'));
    
    expect(headerElement.textContent).toBe('Review all your data before buying the ticket');
    expect(bookASeatComponent).toBeTruthy();
    expect(buttonElement[0].nativeElement.textContent).toBe('Previous');
    expect(buttonElement[1].nativeElement.textContent).toBe('Pay Details');
  });

  it('should display the correct header, component and button when current step is equal to 3', () => {
    component.currentStep = 3;
    
    fixture.detectChanges();

    const headerElement = fixture.debugElement.query(By.css('.dialog-container h2')).nativeElement;
    const bookASeatComponent = fixture.debugElement.query(By.css("app-pay"));
    const buttonElement = fixture.debugElement.queryAll(By.css('.cta-container button'));
    
    expect(headerElement.textContent).toBe('Pay your tickets');
    expect(bookASeatComponent).toBeTruthy();
    expect(buttonElement[0].nativeElement.textContent).toBe('Previous');
    expect(buttonElement[1].nativeElement.textContent).toBe('Pay');
  });

  it('should the button review be disabled if you cannot go the next page', () => {
    const buttonElement = fixture.nativeElement.querySelectorAll('.cta-container button');

    expect(buttonElement[1].disabled).toBe(true);
    expect(buttonElement[1].classList).toContain("disabled");

  });

  it('should the button review be enable if you can go the next page', () => {
    //Given
    component.canGoToReviewPage = true;

    //When
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelectorAll('.cta-container button');

    //Then
    expect(buttonElement[1].disabled).toBe(false);
    expect(buttonElement[1].classList).not.toContain("disabled");
  });

  it('should the button pay be disabled if you cannot pay the tickets', () => {
    component.currentStep = 3;

    fixture.detectChanges();

    const buttonElement = fixture.nativeElement.querySelectorAll('.cta-container button');

    expect(buttonElement[1].disabled).toBe(true);
    expect(buttonElement[1].classList).toContain("disabled");

  });

  it('should the button pay be enable if you can pay the tickets', () => {
    //Given
    component.currentStep = 3;

    component.isFormValid = true;

    //When
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelectorAll('.cta-container button');

    //Then
    expect(buttonElement[1].disabled).toBe(false);
    expect(buttonElement[1].classList).not.toContain("disabled");
  });


});
