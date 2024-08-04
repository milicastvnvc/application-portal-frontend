import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { MobilityType } from "src/app/shared/enums/mobility-type";

export function inclusiveSupportValidator(mobilityType: MobilityType): ValidatorFn {
  return (ctrl: AbstractControl): ValidationErrors | null => {
    const formGroup = ctrl as FormGroup;

    let disadvantaged = formGroup.get('disadvantaged');

    if (!disadvantaged) return { error: true };

    if (mobilityType == MobilityType.StaffAcademic || mobilityType == MobilityType.StaffNonAcademic) {
      formGroup.controls['disadvantaged'].setErrors(null);
      return null;
    }

    if (disadvantaged.value === "")
    {
      formGroup.controls['disadvantaged'].setErrors({ 'required': true });
    }

    return null;
  };
}
