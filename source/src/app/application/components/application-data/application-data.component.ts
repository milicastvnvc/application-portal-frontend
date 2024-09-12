import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from '../../models/application';
import { ApplicationProgress } from '../../models/application-progress';
import { completed, edit, not_completed } from 'src/app/shared/helpers/constants';
import { progressConstant, proposedHostUniversitiesConstant } from '../../helpers/constants';
import { AccountService } from 'src/app/shared/services/account.service';
import { shouldDisableForm } from 'src/app/shared/helpers/disabled-form';
import { routeCheck } from 'src/app/shared/helpers/route-checker';
import { ApplicationStatus } from 'src/app/shared/enums/application-status';
import { FormProgress } from 'src/app/shared/enums/form-progress';
import { MobilityType } from 'src/app/shared/enums/mobility-type';

@Component({
  selector: 'app-application-data',
  templateUrl: './application-data.component.html',
  styleUrls: ['./application-data.component.scss']
})
export class ApplicationDataComponent implements OnInit {

  application!: Application;
  progress!: ApplicationProgress | any;

  progressConstant = progressConstant;
  proposed = proposedHostUniversitiesConstant;
  formProgress = FormProgress;

  completed: string = '../../../../assets/' + completed;
  not_completed: string = '../../../../assets/' + not_completed;
  edit: string = '../../../../assets/' + edit;

  applicationId: number | undefined;
  protected applicationFormGroup!: FormGroup;
  canSubmit: boolean = true;
  isAdmin: boolean = false;
  isCoordinator: boolean = false;
  subheading: string = 'Doctorate (mobility)';

  constructor(private formBuilder: FormBuilder,
    private applicationService: ApplicationService,
    private toastService: ToastService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.isAdmin = this.accountService.isAdmin();
    this.isCoordinator = this.accountService.isCoordinator();

    this.applicationFormGroup = this.formBuilder.group({
      published_name: ['', [Validators.requiredTrue]],
      geniune_information: ['', [Validators.requiredTrue]],
      provide_documents: ['', [Validators.requiredTrue]],
      collect_personal_info: ['', [Validators.requiredTrue]]
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

            if (this.application.mobility)
            {
              if (this.application.mobility.type == MobilityType.Student)
              {
                this.subheading = this.application.mobility.name + " (mobility)";
              }
              if (this.application.mobility.type == MobilityType.Traineeship)
              {
                this.proposed.name = "Proposed host company/institution"
              }
              else
              {
                this.proposed.name = "Proposed host universities"
              }
            }

            if (this.application.status != ApplicationStatus.Created &&
              this.application.status != ApplicationStatus.AdditionalDocuments) {

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
      if (this.progress[constant.id] == FormProgress.Incompleted) {
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
