import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function telephoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const telephoneRegex = /^[0-9\-\+\/]{9,15}$/g;

    const isValid = telephoneRegex.test(control.value);

    return !isValid ? {telephone: {value: control.value}} : null;
  };
}
