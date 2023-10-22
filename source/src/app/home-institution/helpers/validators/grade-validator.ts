import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { BinaryQuestion } from "src/app/shared/enums/binary-question";
import { MobilityType } from "src/app/shared/enums/mobility-type";

export function gradeValidator(mobilityType: MobilityType | undefined): ValidatorFn {
  return (ctrl: AbstractControl): ValidationErrors | null => {
    const formGroup = ctrl as FormGroup;

    let current_grade = formGroup.get('current_grade');
    let previous_gpa = formGroup.get('previous_gpa');

    if (!current_grade || !previous_gpa) return { error: true };

    if (mobilityType === undefined) {
      formGroup.controls['current_grade'].setErrors(null);
      formGroup.controls['previous_gpa'].setErrors(null);
      return null;
    }

    if ((mobilityType != MobilityType.Student && mobilityType != MobilityType.Traineeship)) {
      formGroup.controls['current_grade'].setErrors(null);
      formGroup.controls['previous_gpa'].setErrors(null);
      return null;
    }


    let student_radio = formGroup.get('student_radio');

    if (!(current_grade.value) || Number.isNaN(parseFloat(current_grade.value)))
      formGroup.controls['current_grade'].setErrors({ 'invalid': true });
    if ((!(previous_gpa.value) || Number.isNaN(parseFloat(previous_gpa.value)))) {
      if ((student_radio && student_radio.value == BinaryQuestion.Yes)) {
        formGroup.controls['previous_gpa'].setErrors({ 'invalid': true });
      }
      else {
        formGroup.controls['previous_gpa'].setErrors(null);
      }
    }


    return null;
  };
}
