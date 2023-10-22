import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UsersApplicationsComponent } from './components/users-applications/users-applications.component';
import { ApplicationModule } from '../application/application.module';
import { ApplicationsTableComponent } from './components/applications-table/applications-table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

@NgModule({
  declarations: [
    UsersApplicationsComponent,
    ApplicationsTableComponent,
    AdminPanelComponent
  ],
  imports: [
    SharedModule,
    ApplicationModule,
    NgxPaginationModule
  ],
  exports: [
    AdminPanelComponent
  ]
})
export class AdminModule { }
