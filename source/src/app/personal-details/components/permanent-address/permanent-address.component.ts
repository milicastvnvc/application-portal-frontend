import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PersonalDetails } from '../../models/personal-details';

@Component({
  selector: 'app-permanent-address',
  templateUrl: './permanent-address.component.html',
  styleUrls: ['./permanent-address.component.scss']
})
export class PermanentAddressComponent implements OnInit, OnChanges {

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
        street: this.personalDetails.street,
        postcode: this.personalDetails.postcode,
        city: this.personalDetails.city,
        country: this.personalDetails.country
      });
    }
  }
}
