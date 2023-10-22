import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Gender } from 'src/app/shared/enums/gender';
import { PersonalDetails } from '../../models/personal-details';

@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.scss']
})
export class ApplicantDetailsComponent implements OnInit, OnChanges {

  genders: any = Gender;

  @Input()
  formGroup!: FormGroup;

  @Input()
  submitted: boolean = false;

  @Input()
  personalDetails: PersonalDetails | undefined = undefined;

  get f() { return this.formGroup.controls; }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.personalDetails) {
      this.formGroup.patchValue({
        surname: this.personalDetails.surname,
        fornames: this.personalDetails.fornames,
        birth_date: this.personalDetails.birth_date,
        birth_place: this.personalDetails.birth_place,
        gender: this.personalDetails.gender,
        passport: this.personalDetails.passport
      });
    }
  }
}
