import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const dateRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/g;

    const isValid = dateRegex.test(control.value);

    return !isValid ? {date: {value: control.value}} : null;
  };
}
