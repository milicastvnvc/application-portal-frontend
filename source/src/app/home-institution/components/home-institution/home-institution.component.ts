import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { alphabeticValidator } from 'src/app/shared/helpers/validators/alphabetic-validator';
import { emailValidator } from 'src/app/shared/helpers/validators/email-validator';
import { ToastService } from 'src/app/shared/services/toast.service';
import { HomeInstitutionForm } from '../../models/home-institution-form';
import { HomeInstitutionService } from '../../services/home-institution.service';
import { MobilityType } from 'src/app/shared/enums/mobility-type';
import { gradeValidator } from '../../helpers/validators/grade-validator';
import { BinaryQuestion } from 'src/app/shared/enums/binary-question';
import { Application } from 'src/app/application/models/application';
import { AccountService } from 'src/app/shared/services/account.service';
import { shouldDisableForm } from 'src/app/shared/helpers/disabled-form';
import { routeCheck } from 'src/app/shared/helpers/route-checker';

@Component({
  selector: 'app-home-institution',
  templateUrl: './home-institution.component.html',
  styleUrls: ['./home-institution.component.scss']
})
export class HomeInstitutionComponent implements OnInit {

  formInfo: any;
  applicationId: number | undefined;
  application: Application | undefined = undefined;
  protected formGroup!: FormGroup;
  submitted = false;
  homeInstitution: HomeInstitutionForm | undefined = undefined;
  mobilityType: MobilityType | undefined = undefined;
  homeInstitutionName: string = '';
  homeInstitutionCountry: string = '';
  isAdmin: boolean = false;

  constructor(
    private homeInstitutionService: HomeInstitutionService,
    private toastService: ToastService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.applicationId = routeCheck(this.route);

    if (!this.applicationId) this.router.navigate(['not-found']);

    this.formInfo = this.route.snapshot.data['form_info'];
    this.isAdmin = this.accountService.isAdmin();

    this.formGroup = this.formBuilder.group({
      application_id: [''],
      faculty: ['', [Validators.required]],
      department: ['', [Validators.required]],
      current_grade: [''],
      student_radio:[''],
      previous_gpa: [''],
      study_program: ['', [Validators.required]],
      responsible_person: ['', [Validators.required, alphabeticValidator()]],
      email_responsible_person: ['', [Validators.required, emailValidator()]],
      other_contact: ['']
    });

    this.formGroup.patchValue({
      application_id: this.applicationId,
    });

    this.getHomeInstitutionForm();
  }

  getHomeInstitutionForm() {
    this.homeInstitutionService.getByApplicationId(this.applicationId!).subscribe(
      {
        next: (result) => {

          if (result.success) {

            this.application = result.data.application;

            this.homeInstitution = result.data.form;
            this.homeInstitutionName = this.application.home_institution.name;
            this.homeInstitutionCountry = this.application.home_institution.country;

            if (shouldDisableForm(this.application, this.isAdmin, this.formInfo.id))
            {
              this.formGroup.disable();
            }

            if (this.application.mobility) {
              this.mobilityType = this.application.mobility.type;
              this.formGroup.addValidators([gradeValidator(this.mobilityType)]);
            }

            this.updateForm();
          }
        }
      }
    )
  }

  updateForm(): void {
    if (this.homeInstitution) {
      this.formGroup.patchValue({
        faculty: this.homeInstitution.faculty,
        department: this.homeInstitution.department,
        current_grade: this.homeInstitution.current_grade,
        previous_gpa: this.homeInstitution.previous_gpa,
        study_program: this.homeInstitution.study_program,
        responsible_person: this.homeInstitution.responsible_person,
        email_responsible_person: this.homeInstitution.email_responsible_person,
        other_contact: this.homeInstitution.other_contact,
      });
      if (this.homeInstitution.previous_gpa) {
        this.formGroup.patchValue({
          student_radio: BinaryQuestion.Yes
        });
      }
      else {
        this.formGroup.patchValue({
          student_radio: BinaryQuestion.No
        });
      }
    }

  }

  onSubmit(): void {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.homeInstitutionService.createOrUpdate(this.formGroup.value).subscribe(
      {
        next: (result) => {
          if (result.success) {
            this.homeInstitution = result.data;
            this.toastService.showSuccessToast('Successfully updated home institution');
            this.formGroup.markAsPristine();
            this.router.navigate(['/application-data', this.applicationId]);
          }
          else {
            this.toastService.showErrorsToast(result.errors);
            //this.updateForm();
          }
        }
      }
    )
  }
}
