import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function maxNumberOfDigit(maxDigit: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => { 
        const value = control.value;

        const isValid = /^[0-9]{1,3}$/.test(value);

        return isValid ? null : { reachMaxNumberOfDigits: true};
    }
}