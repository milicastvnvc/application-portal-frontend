import { Component, OnInit } from '@angular/core';
import { Application } from '../../models/application';
import { ApplicationService } from '../../services/application.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ApplicationStatus } from 'src/app/shared/enums/application-status';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.scss']
})
export class MyApplicationsComponent implements OnInit {

  applications: Application[] | null = null;
  completedLength: number = 0;
  inProgressLength: number = 0;
  pendingLength: number = 0;
  shownLength: number = 0;
  status = ApplicationStatus;

  inProgressCheckbox:boolean = true;
  pendingCheckbox:boolean = false;
  completedCheckbox:boolean = false;

  constructor(
    private applicationService: ApplicationService
  ) { }

  ngOnInit(): void {
    this.getMyApplications();
  }

  getMyApplications(): void {
    this.applicationService.getMyApplications().subscribe(
      {
        next: (result) => {
          this.applications = result.data.sort((a, b) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          });

          this.completedLength = this.applications.filter(app => {
            return app.status == ApplicationStatus.Completed;
          }).length;
          this.inProgressLength = this.applications.filter(app => {
            return app.status == ApplicationStatus.Created || app.status == ApplicationStatus.AdditionalDocuments;
          }).length;
          this.pendingLength = this.applications.filter(app => {
            return app.status == ApplicationStatus.Pending;
          }).length;
          this.shownLength = this.inProgressLength;
        }
      });
  }

  updateCheckboxes() : void
  {
    this.shownLength = this.inProgressCheckbox? this.inProgressLength : 0;
    this.shownLength += this.pendingCheckbox? this.pendingLength : 0;
    this.shownLength += this.completedCheckbox? this.completedLength : 0;
  }
}
