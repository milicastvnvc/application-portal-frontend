import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function alphanumericValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const alphanumericRegex = /^[a-zA-Z0-9\-\ ]*$/g;

    const isValid = alphanumericRegex.test(control.value);

    return !isValid ? {alphanumeric: {value: control.value}} : null;
  };
}


// "^[a-zA-Z0-9_]*$"
