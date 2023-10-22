
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function floatNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const floatRegex = /^\d+(\.\d+)?$/g;

    const isValid = floatRegex.test(control.value);

    return !isValid ? {float: {value: control.value}} : null;
  };
}
