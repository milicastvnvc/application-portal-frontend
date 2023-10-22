import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function alphabeticValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const alphabeticRegex = /^[\p{L} ]*$/u;

    const isValid = alphabeticRegex.test(control.value);

    return !isValid ? {alphabetic: {value: control.value}} : null;
  };
}
