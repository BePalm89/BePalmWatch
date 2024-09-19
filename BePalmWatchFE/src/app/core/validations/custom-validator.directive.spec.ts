import { AbstractControl, FormControl } from "@angular/forms";
import { maxNumberOfDigit } from "./custom-validator.directive";

describe("CustomValidator", () => {
  let control: FormControl;

  beforeEach(() => {
    control = new FormControl(null);
  });

  it("should return null if the number of digits is within the valid range", () => {
    const validator = maxNumberOfDigit(3);

    control.setValue("123");
    const result = validator(control);

    expect(result).toBeNull();
  });


  it("should return an error if the number of digits exceeds the maximum", () => {
    const validator = maxNumberOfDigit(3);

    control.setValue("1234");
    const result = validator(control);

    expect(result).toEqual({ reachMaxNumberOfDigits: true });
  });

  it("should return an error if the value is not a number", () => {
    const validator = maxNumberOfDigit(3);

    control.setValue("abcd");
    const result = validator(control);

    expect(result).toEqual({ reachMaxNumberOfDigits: true });
  });

  it("should return an error if the digits of the value are less than the max", () => {
    const validator = maxNumberOfDigit(3);

    control.setValue("12");
    const result = validator(control);

    expect(result).toEqual({ reachMaxNumberOfDigits: true });
  });

  it('should return an error if the value has letters or special characters', () => {
    const validator = maxNumberOfDigit(3);

    control.setValue("!2a");
    const result = validator(control);

    expect(result).toEqual({ reachMaxNumberOfDigits: true});
  })


});
