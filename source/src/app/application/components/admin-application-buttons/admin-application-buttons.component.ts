import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApplicationStatus } from 'src/app/shared/enums/application-status';
import { ApplicationService } from '../../services/application.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-application-buttons',
  templateUrl: './admin-application-buttons.component.html',
  styleUrls: ['./admin-application-buttons.component.scss']
})
export class AdminApplicationButtonsComponent implements OnInit {

  @Input()
  application_id!: number | undefined;

  action: number = -1;
  modalText: string = " ";
  actionLabel: string = " ";

  applicationStatus = ApplicationStatus;

  constructor(
    private applicationService: ApplicationService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  changeAction(status: ApplicationStatus): void {
    this.action = status;
    if (status == ApplicationStatus.AdditionalDocuments) {
      this.modalText = "send application for revalidation";
      this.actionLabel = "sent application for validation";
    }

    if (status == ApplicationStatus.Rejected) {
      this.modalText = "reject application";
      this.actionLabel = "rejected application";
    }

    if (status == ApplicationStatus.Completed) {
      this.modalText = "approve application";
      this.actionLabel = "approved application";
    }
  }

  closeModal(): void {
    this.changeApplicationStatus();
  }

  changeApplicationStatus(): void {
    if (this.application_id != undefined && this.action != -1) {

      this.applicationService.changeApplicationStatus(this.application_id, this.action).subscribe(
        {
          next: (result) => {
            if (result.success) {
              this.toastService.showSuccessToast('Successfully '  + this.actionLabel);
              setTimeout(() => {
                this.router.navigate(['applications'])
              }, 1000);
            }
            else {
              this.toastService.showErrorsToast(result.errors);
            }
          }
        });
    }

  }
}
