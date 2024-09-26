import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PayComponent } from "./pay.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DialogSliderComponent } from "../../shared/ui/dialog-slider/dialog-slider.component";
import { MatDialogRef } from "@angular/material/dialog";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import moment, { Moment } from "moment";
import * as utils from "../../shared/utility/utils";
import { Router, provideRouter } from "@angular/router";
import { NowPlayingService } from "../../core/services/now-playing.service";
import { of } from "rxjs";
import { MatDatepicker } from "@angular/material/datepicker";

describe("PayComponent", () => {
  let component: PayComponent;
  let fixture: ComponentFixture<PayComponent>;
  let matDialogRefMock: jest.Mocked<MatDialogRef<DialogSliderComponent>>;
  let nowPlayingService: NowPlayingService;
  let routerMock:Router;


  beforeEach(async () => {
    matDialogRefMock = {
      close: jest.fn(),
    } as unknown as jest.Mocked<MatDialogRef<DialogSliderComponent>>;

    const nowPlayingServiceMock = {
      updateNowPlayingMovie: jest.fn().mockReturnValue(of({})),
    };

    routerMock = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>

    await TestBed.configureTestingModule({
      imports: [
        PayComponent,
        ReactiveFormsModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefMock },
        { provide: NowPlayingService, useValue: nowPlayingServiceMock },
        provideRouter([]),
      ],
    }).compileComponents();

    nowPlayingService = TestBed.inject(NowPlayingService);
    fixture = TestBed.createComponent(PayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should create the form with correct controls", () => {
    component.ngOnInit();

    fixture.detectChanges();

    expect(component.paymentForm).toBeDefined();

    const form = component.paymentForm;

    expect(form.contains("name")).toBe(true);
    expect(form.contains("cardNumber")).toBe(true);
    expect(form.contains("expirationDate")).toBe(true);
    expect(form.contains("cvv")).toBe(true);
  });

  it("should create the form with the correct default values", () => {
    component.ngOnInit();

    fixture.detectChanges();

    const form = component.paymentForm;

    expect(form.get("name")?.value).toBeNull();
    expect(form.get("cardNumber")?.value).toBeNull();
    expect(moment.isMoment(form.get("expirationDate")?.value)).toBe(true);
    expect(form.get("cvv")?.value).toBeNull();
  });

  it("should create the form with the correct validator for name control", () => {
    component.ngOnInit();

    fixture.detectChanges();

    const form = component.paymentForm;

    const nameControl = form.get("name");
    nameControl?.setValue(null);
    expect(nameControl?.valid).toBe(false);
    nameControl?.setValue("test");
    expect(nameControl?.valid).toBe(true);

    const cardNumber = form.get("cardNumber");

    cardNumber?.setValue(null);
    expect(cardNumber?.valid).toBe(false);
    cardNumber?.setValue("123");
    expect(cardNumber?.valid).toBe(false);
  });

  it("should create the form with the correct validator for card number control", () => {
    component.ngOnInit();

    fixture.detectChanges();

    const form = component.paymentForm;

    const cardNumber = form.get("cardNumber");

    cardNumber?.setValue(null);
    expect(cardNumber?.valid).toBe(false);

    cardNumber?.setValue("123");
    expect(cardNumber?.valid).toBe(false);

    cardNumber?.setValue("1234 1234 1234 1234");
    expect(cardNumber?.valid).toBe(true);
  });

  it("should create the form with the correct validator for cvv control", () => {
    component.ngOnInit();

    fixture.detectChanges();

    const form = component.paymentForm;

    const cvv = form.get("cvv");

    cvv?.setValue(null);
    expect(cvv?.valid).toBe(false);

    cvv?.setValue("12f");
    expect(cvv?.valid).toBe(false);

    cvv?.setValue("123");
    expect(cvv?.valid).toBe(true);
  });

  it("should create the form with the correct validator for expiration date control", () => {
    component.ngOnInit();

    fixture.detectChanges();

    const form = component.paymentForm;

    const expirationDate = form.get("expirationDate");

    expirationDate?.setValue(null);
    expect(expirationDate?.valid).toBe(false);

    expirationDate?.setValue(moment());
    expect(expirationDate?.valid).toBe(true);
  });

  it("should emit formValid event based on form validity", () => {
    const formValidSpy = jest.spyOn(component.formValid, "emit");

    component.ngOnInit();

    fixture.detectChanges();

    expect(component.paymentForm.valid).toBe(false);

    component.paymentForm.patchValue({
      name: "John doe",
      cardNumber: "1234 1234 1234 1234",
      expirationDate: moment(),
      cvv: 123,
    });

    fixture.detectChanges();

    expect(component.paymentForm.valid).toBe(true);
    expect(formValidSpy).toHaveBeenCalledWith(true);

    component.paymentForm.patchValue({
      name: "John doe",
      cardNumber: "1234 1234 1234 1234",
      expirationDate: moment(),
      cvv: 1233,
    });

    fixture.detectChanges();

    expect(component.paymentForm.valid).toBe(false);
    expect(formValidSpy).toHaveBeenCalledWith(false);
  });

  it("should format the card number of value changes and set the formatted value", () => {
    const formattedSpy = jest
      .spyOn(utils, "formattedCardNumber")
      .mockReturnValue("1234 5678 9012 3456");

    component.ngOnInit();

    const setValueSpy = jest.spyOn(
      component.paymentForm.get("cardNumber")!,
      "setValue"
    );

    const cardNumberControl = component.paymentForm.get("cardNumber");
    cardNumberControl?.setValue("1234567890123456");

    expect(formattedSpy).toHaveBeenCalledWith("1234567890123456");

    expect(setValueSpy).toHaveBeenCalledWith("1234 5678 9012 3456", {
      emitEvent: false,
    });
  });

  it("should trigger the api call to save the updated movie, close the dialog and navigate to now playing page", () => {
    const updateMovieSpy = jest
      .spyOn(nowPlayingService, "updateNowPlayingMovie")
      .mockReturnValue(of({}));

    component.ngOnInit();

    component.readyToPay.next(true);

    fixture.detectChanges();

    component.readyToPay.subscribe(() => {
      expect(updateMovieSpy).toHaveBeenCalledWith("1", {
        showtime: [
          {
            date: "2024-09-26",
            times: [
              {
                time: "16:00",
                tickets: [{ row: 1, seat: 1 }],
              },
            ],
          },
        ],
      });
      expect(matDialogRefMock.close).toHaveBeenCalled();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/now-playing']);
    });
  });

  it('should update the month in the expirationDate control and close the datepicker', () => {

    const normalizedMonth = moment().set('month', 5);
    
    const mockDatepicker = {
      close: jest.fn(),
    } as unknown as MatDatepicker<Moment>;

    component.paymentForm.get("expirationDate")?.setValue(moment());
  
    component.setMonthAndYear(normalizedMonth, mockDatepicker);
  
    const expirationDate = component.paymentForm.get("expirationDate")?.value;
    expect(expirationDate.month()).toBe(5); 
  
    expect(mockDatepicker.close).toHaveBeenCalled();
  });

  it('should update the year in the expirationDate control', () => {

    const normalizedYear = moment().set('year', 2024);

    component.paymentForm.get("expirationDate")?.setValue(moment());
  
    component.chosenYearHandler(normalizedYear);
  
    const expirationDate = component.paymentForm.get("expirationDate")?.value;
    expect(expirationDate.year()).toBe(2024); 

  });
});
