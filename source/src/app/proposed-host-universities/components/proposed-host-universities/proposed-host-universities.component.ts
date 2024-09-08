import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProposedHostUniversities } from '../../models/proposed-host-universities';
import { ProposedHostUniversititesService } from '../../services/proposed-host-universitites.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { secondChoiceValidator } from '../../helpers/validators/second-choice-validator';
import { Collapse } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { AccountService } from 'src/app/shared/services/account.service';
import { Semester } from 'src/app/shared/models/semester';
import { Application } from 'src/app/application/models/application';
import { shouldDisableForm } from 'src/app/shared/helpers/disabled-form';
import { routeCheck } from 'src/app/shared/helpers/route-checker';
import { MobilityType } from 'src/app/shared/enums/mobility-type';

@Component({
  selector: 'app-proposed-host-universities',
  templateUrl: './proposed-host-universities.component.html',
  styleUrls: ['./proposed-host-universities.component.scss']
})
export class ProposedHostUniversitiesComponent implements OnInit, AfterViewInit, OnDestroy {

  formInfo: any;
  applicationId: number | undefined;
  application: Application | undefined = undefined;
  protected formGroup!: FormGroup;
  submitted = false;
  proposedHostUniversities: ProposedHostUniversities | undefined = undefined;
  toggleSecondInstitution: boolean = false;
  bsCollapse!: Collapse;
  showSecondChoiceLink: boolean = true;
  eventFunction: any;
  isApplicationSubmitted: boolean = false;
  isAdmin: boolean = false;
  isCoordinator: boolean = false;
  activeSemesters: Semester[] = [];
  institution: string = "university";
  department:string = "Department";

  constructor(private formBuilder: FormBuilder,
    private proposedHostUniversitiesService: ProposedHostUniversititesService,
    private toastService: ToastService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {

    this.applicationId = routeCheck(this.route);
    if (!this.applicationId) this.router.navigate(['not-found']);

    this.formInfo = this.route.snapshot.data['form_info'];
    this.isAdmin = this.accountService.isAdmin();
    this.isCoordinator = this.accountService.isCoordinator();

    this.bsCollapse = new bootstrap.Collapse('#collapseSecondChoice', {
      toggle: false
    });
    this.eventFunction = this.showSecondChoiceLinkFunc.bind(this)

    this.formGroup = this.formBuilder.group({
      application_id: [''],
      host_institution: ['', [Validators.required]],
      department: ['', [Validators.required]],
      host_institution_second: [''],
      department_second: [''],
      semester_id: ['', Validators.required]
    }, { validators: [secondChoiceValidator()] });

    this.formGroup.patchValue({
      application_id: this.applicationId
    });

    this.getProposedHostUniversities();
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.querySelector('#collapseSecondChoice')
      .addEventListener('hidden.bs.collapse', this.eventFunction, true);
  }

  get f() { return this.formGroup.controls; }

  getProposedHostUniversities(): void {
    this.proposedHostUniversitiesService.getByApplicationId(this.applicationId!).subscribe(
      {
        next: (result) => {

          if (result.success) {
            this.proposedHostUniversities = result.data.form;
            this.application = result.data.application;
            this.activeSemesters = result.data.active_semesters;

            if (this.application.mobility) {
              if (this.application.mobility.type == MobilityType.Traineeship)
              {
                this.institution = "institution";
              }
              else
              {
                this.department += "/Study program"
              }
            }

            if (shouldDisableForm(this.application, this.isAdmin, this.formInfo.id)) {
              this.isApplicationSubmitted = true;
              this.formGroup.disable();
            }

            if (this.proposedHostUniversities && this.proposedHostUniversities.host_institution_second) {
              this.showSecondChoice();
            }

            this.updateForm();
          }
        }
      }
    )
  }

  updateForm(): void {
    if (this.proposedHostUniversities) {
      this.formGroup.patchValue({
        host_institution: this.proposedHostUniversities.host_institution,
        department: this.proposedHostUniversities.department,
        host_institution_second: this.proposedHostUniversities.host_institution_second,
        department_second: this.proposedHostUniversities.department_second,
        semester_id: this.proposedHostUniversities.semester_id
      });
    }
  }

  changeSemester(e: any) {
    this.formGroup.patchValue({
      semester_id: e.target.value
    });
  }

  showSecondChoice(): void {
    this.bsCollapse.show();
    this.showSecondChoiceLink = false;
  }

  hideSecondChoice(): void {
    this.bsCollapse.hide();
    this.formGroup.patchValue({
      host_institution_second: '',
      department_second: ''
    });
    this.formGroup.markAsDirty();
  }

  showSecondChoiceLinkFunc(event: any): void {
    this.showSecondChoiceLink = true;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.proposedHostUniversitiesService.createOrUpdate(this.formGroup.value).subscribe(
      {
        next: (result) => {
          if (result.success) {
            this.proposedHostUniversities = result.data;
            this.toastService.showSuccessToast('Successfully updated proposed host universities');
            this.updateForm();
            this.formGroup.markAsPristine();
          }
          else {
            this.toastService.showErrorsToast(result.errors);
          }
        }
      }
    )
  }

  ngOnDestroy(): void {
    removeEventListener('hidden.bs.collapse', this.eventFunction, true);
  }

}
