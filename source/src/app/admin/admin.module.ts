import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UsersApplicationsComponent } from './components/users-applications/users-applications.component';
import { ApplicationModule } from '../application/application.module';
import { ApplicationsTableComponent } from './components/applications-table/applications-table.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    UsersApplicationsComponent,
    ApplicationsTableComponent
  ],
  imports: [
    SharedModule,
    ApplicationModule,
    NgxPaginationModule
  ],
  exports: [
    UsersApplicationsComponent
  ]
})
export class AdminModule { }
