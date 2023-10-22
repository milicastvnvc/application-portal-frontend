import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passportValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const passportRegex = /^(?!^0+$)[a-zA-Z0-9]{3,20}$/g;

    const isValid = passportRegex.test(control.value);

    return !isValid ? {passport: {value: control.value}} : null;
  };
}


