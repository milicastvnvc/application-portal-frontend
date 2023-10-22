import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeInstitutionComponent } from './components/home-institution/home-institution.component';
import { IdentificationComponent } from './components/identification/identification.component';
import { DetailsHomeInstitutionComponent } from './components/details-home-institution/details-home-institution.component';

@NgModule({
  declarations: [
    HomeInstitutionComponent,
    IdentificationComponent,
    DetailsHomeInstitutionComponent
  ],
  imports: [
    SharedModule
  ]
})
export class HomeInstitutionModule { }
