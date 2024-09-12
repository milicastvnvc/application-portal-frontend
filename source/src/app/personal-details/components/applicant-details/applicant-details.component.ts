import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Collapse } from 'bootstrap';
import { Gender } from 'src/app/shared/enums/gender';
import { AccountService } from 'src/app/shared/services/account.service';
import { PersonalDetails } from '../../models/personal-details';
import * as bootstrap from 'bootstrap';
import { PersonalDetailsService } from '../../services/personal-details.service';
import { routeCheck } from 'src/app/shared/helpers/route-checker';
import { ActivatedRoute } from '@angular/router';

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

  isAdmin: boolean = false;
  isApplicationSubmitted: boolean = false;
  bsCollapse!: Collapse;
  eventFunction: any;
  showSecondChoiceLink: boolean = true;
  applicationId: number | undefined;
  toggleValidators: boolean = false;

  get f() { return this.formGroup.controls; }

  constructor(private accountService: AccountService,private elementRef: ElementRef, private personalDetailsService: PersonalDetailsService, private route: ActivatedRoute,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.applicationId = routeCheck(this.route);
    this.isAdmin = this.accountService.isAdmin();
    
    this.formGroup.addControl('participation_count', this.fb.control('', [Validators.required, Validators.min(1), Validators.max(5)]));
    
    for (let i = 1; i <= 5; i++) {
      this.formGroup.addControl(`name_of_host_institution_${i}`, this.fb.control(''));
      this.formGroup.addControl(`mobility_date_${i}`, this.fb.control(''));
    }

    this.formGroup.get('participation_count')?.valueChanges.subscribe(count => {
      this.updateValidators(count);
    });
 
  }

  updateValidators(count: number) {
    for (let i = 1; i <= 5; i++) {
      if (i <= count) {
        this.formGroup.get(`name_of_host_institution_${i}`)?.setValidators([Validators.required]);
        this.formGroup.get(`mobility_date_${i}`)?.setValidators([Validators.required]);
      } else {
        this.formGroup.get(`name_of_host_institution_${i}`)?.clearValidators();
        this.formGroup.get(`mobility_date_${i}`)?.clearValidators();
      }
      this.formGroup.get(`name_of_host_institution_${i}`)?.updateValueAndValidity();
      this.formGroup.get(`mobility_date_${i}`)?.updateValueAndValidity();
    }
  }

  onParticipationCountChange(): void {
    const count = this.formGroup.get('participation_count')?.value;

    for (let i = 1; i <= 5; i++) {
      if (i > count) {
        this.formGroup.get(`name_of_host_institution_${i}`)?.reset();
        this.formGroup.get(`mobility_date_${i}`)?.reset();
      }
    }
  }

  getCount(count: number): number[] {
    return Array.from({ length: count }, (_, index) => index);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.personalDetails) {
      this.formGroup.patchValue({
        surname: this.personalDetails.surname,
        fornames: this.personalDetails.fornames,
        birth_date: this.personalDetails.birth_date,
        birth_place: this.personalDetails.birth_place,
        gender: this.personalDetails.gender,
        passport: this.personalDetails.passport,
        previous_participation: this.personalDetails.previous_participation?true:false,//obavezno ovako inace iz nekog razloga nece da radi
        participation_count: this.personalDetails.participation_count,
      });

      for (let i = 1; i <= 5; i++) {
        const institutionField = `name_of_host_institution_${i}` as keyof PersonalDetails;
        const dateField = `mobility_date_${i}` as keyof PersonalDetails;
        if (institutionField in this.personalDetails && dateField in this.personalDetails) {
          this.formGroup.patchValue({
            [institutionField]: this.personalDetails[institutionField] || '',
            [dateField]: this.personalDetails[dateField] || ''
          });
        }
      }
    }

  }

  
}
