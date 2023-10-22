import { NgModule } from '@angular/core';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { SharedModule } from '../shared/shared.module';
import { PermanentAddressComponent } from './components/permanent-address/permanent-address.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { ApplicantDetailsComponent } from './components/applicant-details/applicant-details.component';
import { AdditionalInformationComponent } from './components/additional-information/additional-information.component';

@NgModule({
  declarations: [
    PersonalDetailsComponent,
    PermanentAddressComponent,
    ContactDetailsComponent,
    ApplicantDetailsComponent,
    AdditionalInformationComponent
  ],
  imports: [
    SharedModule
  ]
})
export class PersonalDetailsModule { }
