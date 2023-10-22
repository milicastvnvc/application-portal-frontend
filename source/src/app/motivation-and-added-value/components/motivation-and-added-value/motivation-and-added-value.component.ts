import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MotivationAndAddedValueService } from '../../services/motivation-and-added-value.service';
import { MotivationAndAddedValue } from '../../models/motivation-and-added-value';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Application } from 'src/app/application/models/application';
import { AccountService } from 'src/app/shared/services/account.service';
import { shouldDisableForm } from 'src/app/shared/helpers/disabled-form';
import { routeCheck } from 'src/app/shared/helpers/route-checker';

@Component({
  selector: 'app-motivation-and-added-value',
  templateUrl: './motivation-and-added-value.component.html',
  styleUrls: ['./motivation-and-added-value.component.scss']
})
export class MotivationAndAddedValueComponent implements OnInit {

  formInfo: any;
  applicationId: number | undefined;
  application: Application | undefined = undefined;
  protected formGroup!: FormGroup;
  submitted = false;
  isAdmin: boolean = false;

  motivationAndAddedValue: MotivationAndAddedValue | undefined = undefined;

  constructor(private formBuilder: FormBuilder,
    private motivationAndAddedValueService: MotivationAndAddedValueService,
    private toastService: ToastService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.applicationId = routeCheck(this.route);
    if (!this.applicationId) this.router.navigate(['not-found']);

    this.formInfo = this.route.snapshot.data['form_info'];
    this.isAdmin = this.accountService.isAdmin();

    this.formGroup = this.formBuilder.group({
      application_id: [''],
      chosen_institution: ['', [Validators.required, Validators.minLength(300), Validators.maxLength(1000)]],
      mobility_impact: ['', [Validators.required, Validators.minLength(300), Validators.maxLength(1000)]]
    });

    this.formGroup.patchValue({
      application_id: this.applicationId,
    });

    this.getMotivataionAndAddedValue();
  }

  get f() { return this.formGroup.controls; }

  get chosen_institution() {
    return this.formGroup.get('chosen_institution')!.value;
  }

  get mobility_impact() {
    return this.formGroup.get('mobility_impact')!.value;
  }

  getMotivataionAndAddedValue(): void {
    this.motivationAndAddedValueService.getByApplicationId(this.applicationId!).subscribe(
      {
        next: (result) => {
          if (result.success) {
            this.motivationAndAddedValue = result.data.form;
            this.application = result.data.application;

            this.setForm();

            if (shouldDisableForm(this.application, this.isAdmin, this.formInfo.id))
            {
              this.formGroup.disable();
            }
          }
        }
      }
    )
  }

  setForm(): void {
    if (this.motivationAndAddedValue) {
      this.formGroup.patchValue({
        chosen_institution: this.motivationAndAddedValue.chosen_institution,
        mobility_impact: this.motivationAndAddedValue.mobility_impact
      });
    }
  }

  onSumbit(): void {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.motivationAndAddedValueService.createOrUpdate(this.formGroup.value).subscribe(
      {
        next: (result) => {
          if (result.success) {
            this.motivationAndAddedValue = result.data;
            this.setForm();
            this.toastService.showSuccessToast('Successfully updated motivation and added value.');
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
