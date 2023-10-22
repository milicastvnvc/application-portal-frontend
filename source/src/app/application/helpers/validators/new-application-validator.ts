import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { OTHER_MOBILITY } from "../constants";

export function checkOtherOption(): ValidatorFn {
  return (ctrl: AbstractControl): ValidationErrors | null => {
    const formGroup = ctrl as FormGroup;

    let mobility = formGroup.get('mobility_id');
    let other = formGroup.get('other_mobility');

    if (mobility && other) {

      if (mobility.value != OTHER_MOBILITY) return null;
      if (mobility.value == OTHER_MOBILITY && other.value != '') return null;

      return { mustHaveOther: true };
    }

    return { mustHaveOther: true };
  };
}
