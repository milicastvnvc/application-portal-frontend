import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function secondChoiceValidator(): ValidatorFn {
  return (ctrl: AbstractControl): ValidationErrors | null => {
    const formGroup = ctrl as FormGroup;

    let host_institution_second = formGroup.get('host_institution_second');
    let department_second = formGroup.get('department_second');

    if (!host_institution_second || !department_second) return { error: true };

    if ((!(host_institution_second.value) && !(department_second.value)) || (host_institution_second.value && department_second.value)) {
      formGroup.controls['host_institution_second'].setErrors(null);
      formGroup.controls['department_second'].setErrors(null);
      return null;
    }

    if (!(host_institution_second.value)) formGroup.controls['host_institution_second'].setErrors({ 'missing': true });
    if (!(department_second.value)) formGroup.controls['department_second'].setErrors({ 'missing': true });

    return { includeBoth: true };
  };
}
