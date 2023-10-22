import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from '../../models/application';
import { ApplicationProgress } from '../../models/application-progress';
import { completed, not_completed } from 'src/app/shared/helpers/constants';
import { progressConstant } from '../../helpers/constants';
import { AccountService } from 'src/app/shared/services/account.service';
import { shouldDisableForm } from 'src/app/shared/helpers/disabled-form';
import { routeCheck } from 'src/app/shared/helpers/route-checker';

@Component({
  selector: 'app-application-data',
  templateUrl: './application-data.component.html',
  styleUrls: ['./application-data.component.scss']
})
export class ApplicationDataComponent implements OnInit {

  application!: Application;
  progress!: ApplicationProgress | any;

  progressConstant = progressConstant;

  completed: string = '../../../../assets/' + completed;
  not_completed: string = '../../../../assets/' + not_completed;

  applicationId: number | undefined;
  protected applicationFormGroup!: FormGroup;
  canSubmit: boolean = true;
  isAdmin: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private applicationService: ApplicationService,
    private toastService: ToastService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.isAdmin = this.accountService.isAdmin();

    this.applicationFormGroup = this.formBuilder.group({
      published_name: ['', [Validators.required]],
      geniune_information: ['', [Validators.required]],
      provide_documents: ['', [Validators.required]],
      collect_personal_info: ['', [Validators.required]]
    });

    this.applicationId = routeCheck(this.route);

    if (!this.applicationId) this.router.navigate(['not-found']);

    this.getApplicationById();
  }

  getApplicationById(): void {
    this.applicationService.getMyApplicationById(this.applicationId!).subscribe(
      {
        next: (result) => {
          if (result.success) {
            this.application = result.data;
            this.progress = this.application.progress;

            if (this.application.submitted_at != undefined) {

              this.applicationFormGroup.patchValue({
                published_name: true,
                geniune_information: true,
                provide_documents: true,
                collect_personal_info: true
              });
            }

            if (shouldDisableForm(this.application, this.isAdmin)) {
              this.canSubmit = false;
              this.applicationFormGroup.disable();
            }
          }
          else {
            this.toastService.showErrorsToast(result.errors);
            setTimeout(() => {
              this.router.navigate(['applications'])
            }, 500);
          }
        }
      }
    );
  }

  onSubmit(): void {

    if (this.applicationFormGroup.invalid)
      return;


    for(let constant of this.progressConstant) {
      if (!this.progress[constant.id]) {
        this.toastService.showErrorsToast(['Not all forms are filled.'])
        return;
      }
    }

    this.applicationService.submitApplication(this.applicationId!).subscribe(
      {
        next: (result) => {
          if (result.success) {
            this.toastService.showSuccessToast('Successfully submitted application');
            this.canSubmit = false;
            setTimeout(() => {
              this.router.navigate(['applications'])
            }, 1000);
          }
          else {
            this.toastService.showErrorsToast(result.errors);
          }
        }
      });
  }

}
