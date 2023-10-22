import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeInstitutionsService } from 'src/app/application/services/home-institutions.service';
import { HomeInstitution } from '../../models/home-institution';
import { CreateApplicationRequest } from '../../models/create-application-request';
import { MobilityService } from '../../services/mobility.service';
import { Mobility } from '../../models/mobility';
import { OTHER_MOBILITY } from '../../helpers/constants';
import { checkOtherOption } from '../../helpers/validators/new-application-validator';

@Component({
  selector: 'app-new-application',
  templateUrl: './new-application.component.html',
  styleUrls: ['./new-application.component.scss']
})
export class NewApplicationComponent implements OnInit {

  protected applicationFormGroup!: FormGroup;
  submitted: boolean = false;
  homeInstitutions: HomeInstitution[] = [];
  mobilities: Mobility[] = [];
  otherMobilityConst = OTHER_MOBILITY;

  constructor(private formBuilder: FormBuilder,
    private applicationService: ApplicationService,
    private homeInstitutionsService: HomeInstitutionsService,
    private mobilityService: MobilityService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllHomeInstitutions();
    this.getAllMobilities();

    this.applicationFormGroup = this.formBuilder.group({
      mobility_id: ['', [Validators.required, Validators.min(1)]],
      home_institution_id: ['', [Validators.required, Validators.min(1)]],
      other_mobility: ['']
    }, { validators: [checkOtherOption()] });

  }

  getAllMobilities(): void {
    this.mobilityService.getAll().subscribe(
      {
        next: (result) => {
          if (!result.success) {
            this.toastService.showErrorsToast(result.errors);
          }
          else {
            this.mobilities = result.data;
          }
        }
      }
    )
  }

  getAllHomeInstitutions(): void {
    this.homeInstitutionsService.getAll().subscribe(
      {
        next: (result) => {
          if (!result.success) {
            this.toastService.showErrorsToast(result.errors);
          }
          else {
            this.homeInstitutions = result.data;
          }
        }
      }
    )
  }

  get f() {
    return this.applicationFormGroup.controls;
  }

  get mobility() {
    return this.applicationFormGroup.get('mobility_id')!;
  }

  get otherMobility() {
    return this.applicationFormGroup.get('other_mobility')!;
  }

  get homeInstitution() {
    return this.applicationFormGroup.get('home_institution_id')!;
  }

  changeMobility(e: any) {
    this.applicationFormGroup.patchValue({
      mobility_id: e.target.value
    });
  }

  changeHomeInstitution(e: any) {
    this.applicationFormGroup.patchValue({
      home_institution_id: e.target.value
    });
  }

  onSubmit(): void {

    this.submitted = true;

    if (this.applicationFormGroup.invalid) {
      return;
    }

    const mobilityConst = this.mobility.value != this.otherMobilityConst ? this.mobility.value : undefined;
    const createApplicationRequest: CreateApplicationRequest = {
      mobility_id: mobilityConst,
      home_institution_id: Number(this.homeInstitution.value),
      other_mobility: this.otherMobility.value
    }

    this.applicationService.createApplication(createApplicationRequest).subscribe(
      {
        next: (result) => {
          if (result.success) {
            if (result.data) {
              this.toastService.showSuccessToast('Successfully created application.');
              this.router.navigate(['application-data', result.data.id]);
            }

          }
          else {
            this.toastService.showErrorsToast(result.errors);
          }
        }
      }
    );
  }
}

