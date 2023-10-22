import { Component, OnInit } from '@angular/core';
import { Application } from '../../models/application';
import { ApplicationService } from '../../services/application.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.scss']
})
export class MyApplicationsComponent implements OnInit {

  applications: Application[] | null = null;
  submittedLength: number = 0;
  inProcessLength: number = 0;

  inProgressCheckbox:boolean = true;
  submittedCheckbox:boolean = false;

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
          this.applications = result;
          this.submittedLength = this.applications.filter(app => {
            return app.submitted_at != undefined;
          }).length;
          this.inProcessLength = this.applications.length - this.submittedLength;
        }
      });
  }
}
