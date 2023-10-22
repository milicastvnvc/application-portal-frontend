import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MotivationAndAddedValueComponent } from './components/motivation-and-added-value/motivation-and-added-value.component';

@NgModule({
  declarations: [
    MotivationAndAddedValueComponent
  ],
  imports: [
    SharedModule
  ]
})
export class MotivationAndAddedValueModule { }
