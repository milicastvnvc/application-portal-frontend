import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from 'src/app/application/models/application';
import { ApplicationService } from 'src/app/application/services/application.service';
import { itemsPerPage, maxPage } from 'src/app/shared/helpers/constants';
import { AccountService } from 'src/app/shared/services/account.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AdminApplication } from '../../models/admin-application';

@Component({
  selector: 'app-applications-table',
  templateUrl: './applications-table.component.html',
  styleUrls: ['./applications-table.component.scss']
})
export class ApplicationsTableComponent implements OnInit {

  @Input()
  applications: AdminApplication[] = [];

  @Input()
  totalItems: number = 0;

  @Input()
  currentPage: number = 1;

  @Output()
  pageChangeEmitter = new EventEmitter<number>();

  maxPage: number = maxPage;

  itemsPerPage: number = itemsPerPage;

  selectedApplicationId!: number;

  isAdmin: boolean = false;

  constructor(private applicationService: ApplicationService,private router: Router,private toastService: ToastService, private accountService: AccountService) {}

  ngOnInit(): void {
    console.log(this.applications);
    this.isAdmin = this.accountService.isAdmin();
  }

  onPageChange(number: number) {
    this.currentPage = number;
    this.pageChangeEmitter.emit(this.currentPage);
  }

  changeAction(applicationId: number, event:Event) {
    event.stopPropagation();
    this.selectedApplicationId = applicationId;
    // this.pageChangeEmitter.emit(this.currentPage);
  }

  confirmDelete(): void {
    // console.log("aplication deleted");
    this.deleteApplication();
  }

  deleteApplication(): void {
    this.applicationService.deleteApplication(this.selectedApplicationId)
      .subscribe(
        (response) => {
          if (response.success) {
            this.loadApplications();
            this.toastService.showSuccessToast('Application deleted successfully');
              setTimeout(() => {
                // console.log('Application deleted successfully');
              }, 1000);
          } else {
            this.toastService.showErrorsToast(response.errors);
          }
        },
        (error) => {
          this.toastService.showErrorsToast(['Something went wrong on the server']);
        }
      );
  }

  loadApplications(): void {
  this.applicationService.getAllApplications().subscribe(
    (response) => {
      if (response.success) {
        this.applications = response.data.data; // Adjust based on your actual response structure

      } else {
        console.error('Failed to load applications:', response.errors);
      }
    },
    (error) => {
      console.error('Error loading applications:', error);
    }
  );
}

  
}
