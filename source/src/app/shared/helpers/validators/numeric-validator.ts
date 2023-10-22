import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function numericValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const numericRegex = /^[0-9]*$/g;

    const isValid = numericRegex.test(control.value);

    return !isValid ? {numeric: {value: control.value}} : null;
  };
}
