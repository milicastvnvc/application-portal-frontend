import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HomeInstitutionForm } from '../../models/home-institution-form';
import { MobilityType } from 'src/app/shared/enums/mobility-type';
import { BinaryQuestion } from 'src/app/shared/enums/binary-question';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent implements OnInit, OnChanges {

  @Input()
  formGroup!: FormGroup;

  @Input()
  submitted: boolean = false;

  @Input()
  homeInstitution: HomeInstitutionForm | undefined = undefined;

  @Input()
  mobilityType: MobilityType | undefined = undefined;

  binaryQuestion = BinaryQuestion;
  mTypes = MobilityType;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.homeInstitution) {
      this.formGroup.patchValue({
        faculty: this.homeInstitution.faculty,
        department:  this.homeInstitution.department,
        study_program:  this.homeInstitution.study_program,
        current_grade: this.homeInstitution.current_grade,
        previous_gpa: this.homeInstitution.previous_gpa,
        responsible_person:  this.homeInstitution.responsible_person,
        email_responsible_person:  this.homeInstitution.email_responsible_person,
        other_contact:  this.homeInstitution.other_contact
      });

      if (this.homeInstitution.previous_gpa) {
        this.formGroup.patchValue({
          student_radio: this.binaryQuestion.Yes
        });
      }
      else {
        this.formGroup.patchValue({
          student_radio: this.binaryQuestion.No
        });
      }
    }
  }

  get f() { return this.formGroup.controls; }

  changePreviousGPA() {
    if (this.f['student_radio'].value == this.binaryQuestion.No) {
      this.formGroup.patchValue({
        previous_gpa: null
      });
    }
  }

}
