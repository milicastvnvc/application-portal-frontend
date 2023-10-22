import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProposedHostUniversitiesComponent } from './components/proposed-host-universities/proposed-host-universities.component';

@NgModule({
  declarations: [
    ProposedHostUniversitiesComponent
  ],
  imports: [
    SharedModule
  ]
})
export class ProposedHostUniversitiesModule { }
