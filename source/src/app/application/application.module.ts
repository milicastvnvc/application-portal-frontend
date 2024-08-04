import { NgModule } from '@angular/core';
import { MyApplicationsComponent } from './components/my-applications/my-applications.component';
import { NewApplicationComponent } from './components/new-application/new-application.component';
import { SharedModule } from '../shared/shared.module';
import { ApplicationDataComponent } from './components/application-data/application-data.component';
import { MyApplicationComponent } from './components/my-application/my-application.component';
import { CaptionComponent } from './components/caption/caption.component';
import { CaptionBodyComponent } from './components/caption-body/caption-body.component';
import { AdminApplicationButtonsComponent } from './components/admin-application-buttons/admin-application-buttons.component';

@NgModule({
  declarations: [
    MyApplicationsComponent,
    NewApplicationComponent,
    ApplicationDataComponent,
    MyApplicationComponent,
    CaptionComponent,
    CaptionBodyComponent,
    AdminApplicationButtonsComponent
  ],
  imports: [
    SharedModule
  ],
  exports:[
    MyApplicationsComponent
  ]
})
export class ApplicationModule { }
