import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function maxNumberOfDigit(maxDigit: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => { 
        const value = control.value;

        const isValid = new RegExp(`^[0-9]{${maxDigit}}$`).test(value);

        return isValid ? null : { reachMaxNumberOfDigits: true};
    }
}