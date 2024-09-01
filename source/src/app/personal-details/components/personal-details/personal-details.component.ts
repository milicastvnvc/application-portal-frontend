import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { alphabeticValidator } from 'src/app/shared/helpers/validators/alphabetic-validator';
import { dateValidator } from 'src/app/shared/helpers/validators/date-validator';
import { emailValidator } from 'src/app/shared/helpers/validators/email-validator';
import { alphanumericValidator } from 'src/app/shared/helpers/validators/alphanumeric-validator';
import { PersonalDetailsService } from '../../services/personal-details.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PersonalDetails } from '../../models/personal-details';
import { passportValidator } from 'src/app/shared/helpers/validators/passport-validator';
import { pastDateValidator } from 'src/app/shared/helpers/validators/past-date-validator';
import { telephoneValidator } from 'src/app/shared/helpers/validators/telephone-validator';
import { Application } from 'src/app/application/models/application';
import { AccountService } from 'src/app/shared/services/account.service';
import { shouldDisableForm } from 'src/app/shared/helpers/disabled-form';
import { routeCheck } from 'src/app/shared/helpers/route-checker';
import { inclusiveSupportValidator } from '../../helpers/validators/inclusive-support-validator';
import { MobilityType } from 'src/app/shared/enums/mobility-type';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {

  formInfo: any;
  applicationId: number | undefined;
  application: Application | undefined = undefined;
  mobilityType: MobilityType | undefined;
  protected formGroup!: FormGroup;
  submitted = false;
  isAdmin: boolean = false;

  personalDetails: PersonalDetails | undefined = undefined;
  mTypes = MobilityType;

  constructor(private formBuilder: FormBuilder,
    private personalDetailsService: PersonalDetailsService,
    private toastService: ToastService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.applicationId = routeCheck(this.route);
    if (!this.applicationId) this.router.navigate(['not-found']);

    this.formInfo = this.route.snapshot.data['form_info'];
    this.isAdmin = this.accountService.isAdmin();

    this.formGroup = this.formBuilder.group({
      application_id: [''],
      surname: ['', [Validators.required, alphabeticValidator()]],
      fornames: ['', [Validators.required, alphabeticValidator()]],
      birth_date: ['', [Validators.required, dateValidator(), pastDateValidator()]],
      birth_place: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      passport: ['', [Validators.required, passportValidator()]],
      street: ['', [Validators.required]],
      postcode: ['', [Validators.required, alphanumericValidator()]],
      city: ['', [Validators.required, alphabeticValidator()]],
      country: ['', [Validators.required]],
      telephone: ['', [Validators.required, telephoneValidator()]],
      email: ['', [Validators.required, emailValidator()]],
      alternative_email: [''],
      disadvantaged: [''],
      previous_host_institution: [''],
      mobility_dates: [''],
    });

    this.formGroup.patchValue({
      application_id: this.applicationId,
    });

    this.getPersonalDetails();
  }

  get f() { return this.formGroup.controls; }

  getPersonalDetails(): void {
    this.personalDetailsService.getByApplicationId(this.applicationId!).subscribe(
      {
        next: (result) => {
          if (result.success) {
            this.personalDetails = result.data.form;
            this.application = result.data.application;

            // Update the formGroup with the fetched personal details
          if (this.personalDetails) {
            this.formGroup.patchValue({
              surname: this.personalDetails.surname,
              fornames: this.personalDetails.fornames,
              birth_date: this.personalDetails.birth_date,
              birth_place: this.personalDetails.birth_place,
              gender: this.personalDetails.gender,
              passport: this.personalDetails.passport,
              previous_host_institution: this.personalDetails.previous_host_institution,
              mobility_dates: this.personalDetails.mobility_dates,
            });
          }

            if (this.application.mobility) {
              this.mobilityType = this.application.mobility.type;
              this.formGroup.addValidators([inclusiveSupportValidator(this.mobilityType)]);
            }

            if (shouldDisableForm(this.application, this.isAdmin,  this.formInfo.id))
            {
              this.formGroup.disable();
            }
          }
        }
      }
    )
  }


  onSubmit(): void {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.personalDetailsService.createOrUpdate(this.formGroup.value).subscribe(
      {
        next: (result) => {
          if (result.success) {
            this.personalDetails = result.data;
            this.toastService.showSuccessToast('Successfully updated personal details');
            this.formGroup.markAsPristine();
          }
          else {
            this.toastService.showErrorsToast(result.errors);
          }
        }
      }
    )
  }
}
