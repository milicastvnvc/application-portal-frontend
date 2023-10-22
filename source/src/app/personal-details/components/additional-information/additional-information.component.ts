import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BinaryQuestion } from 'src/app/shared/enums/binary-question';
import { PersonalDetails } from '../../models/personal-details';

@Component({
  selector: 'app-additional-information',
  templateUrl: './additional-information.component.html',
  styleUrls: ['./additional-information.component.scss']
})
export class AdditionalInformationComponent implements OnInit, OnChanges {

  @Input()
  formGroup!: FormGroup;

  @Input()
  submitted: boolean = false;

  @Input()
  personalDetails: PersonalDetails | undefined = undefined;

  disadvantaged = BinaryQuestion;

  get f() {
    return this.formGroup.controls;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.personalDetails) {
      this.formGroup.patchValue({
        disadvantaged: this.personalDetails.disadvantaged
      });
    }
  }
}
