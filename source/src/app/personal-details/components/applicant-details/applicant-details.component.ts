import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private accountService: AccountService,private elementRef: ElementRef, private personalDetailsService: PersonalDetailsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.applicationId = routeCheck(this.route);
    // console.log("application id:",this.applicationId);
    this.isAdmin = this.accountService.isAdmin();
    this.bsCollapse = new bootstrap.Collapse('#collapseSecondChoice', {
      toggle: false
    });
    this.eventFunction = this.showSecondChoiceLinkFunc.bind(this)
    
    // Inicijalizacija form controla u form grupi
    // if (!this.f['previous_host_institution']) {
    //   this.formGroup.addControl('previous_host_institution', new FormControl('',this.isAdmin ? null : Validators.required));
    // }
    // if (!this.f['mobility_dates']) {
    //   this.formGroup.addControl('mobility_dates', new FormControl('',this.isAdmin ? null : Validators.required));
    // }
    // this.updateValidators();

    if (this.isAdmin) {
      this.bsCollapse.show();
    }
 
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
        previous_host_institution: this.personalDetails.previous_host_institution || '',
        mobility_dates: this.personalDetails.mobility_dates || '',
        previous_participation: this.personalDetails.previous_participation?true:false,//obavezno ovako inace iz nekog razloga nece da radi
        participation_count: this.personalDetails.participation_count,
      });
    }
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.querySelector('#collapseSecondChoice')
      .addEventListener('hidden.bs.collapse', this.eventFunction, true);
  }

  showSecondChoice(): void {
    this.bsCollapse.show();
    this.showSecondChoiceLink = false;
    // this.updateValidators(true);
  }

  hideSecondChoice(): void {
    this.bsCollapse.hide();
    if(!this.isAdmin){
        this.formGroup.patchValue({
        previous_host_institution: '',
        mobility_dates: ''
      });
    }
    // this.updateValidators(false);
    this.formGroup.markAsDirty();
    
  }

  showSecondChoiceLinkFunc(event: any): void {
    this.showSecondChoiceLink = true;
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.querySelector('#collapseSecondChoice')
    .removeEventListener('hidden.bs.collapse', this.eventFunction, true);  
  }

  private updateValidators(show: boolean = false): void {
    if(!this.isAdmin){
      if (show) {
        this.f['previous_host_institution'].setValidators(Validators.required);
        this.f['mobility_dates'].setValidators(Validators.required);
      } else {
        this.f['previous_host_institution'].clearValidators();
        this.f['mobility_dates'].clearValidators();
      }
      
    }
    
  }
}
