import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PersonalDetails } from '../../models/personal-details';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit, OnChanges {

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
        telephone: this.personalDetails.telephone,
        email: this.personalDetails.email,
        alternative_email: this.personalDetails.alternative_email
      });
    }
  }
}
