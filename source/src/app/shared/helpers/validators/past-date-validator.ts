import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function pastDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    let date = new Date(control.value);
    let now = new Date();

    let isValid = now > date;

    return !isValid ? {past: {value: control.value}} : null;
  };
}
