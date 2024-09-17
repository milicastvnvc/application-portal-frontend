import { Component, OnInit } from '@angular/core';
import { HomeInstitution } from 'src/app/application/models/home-institution';
import { Mobility } from 'src/app/application/models/mobility';
import { ApplicationService } from 'src/app/application/services/application.service';
import { HomeInstitutionsService } from 'src/app/application/services/home-institutions.service';
import { MobilityService } from 'src/app/application/services/mobility.service';
import { itemsPerPage } from 'src/app/shared/helpers/constants';
import { PaginationResult } from 'src/app/shared/models/pagination-result';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AdminApplication } from '../../models/admin-application';
import { ApplicationStatus } from 'src/app/shared/enums/application-status';
import { statusConstant } from '../../helpers/constants';
import { Call } from 'src/app/application/models/call';
import { CallService } from 'src/app/application/services/call.service';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-users-applications',
  templateUrl: './users-applications.component.html',
  styleUrls: ['./users-applications.component.scss']
})
export class UsersApplicationsComponent implements OnInit {

  paginatedResult: PaginationResult<AdminApplication> | undefined = undefined;
  mobilities: Mobility[] = [];
  homeInstitutions: HomeInstitution[] = [];
  allStatuses = statusConstant.slice(1);
  currentPage: number = 1;
  searchKey: string = '';
  mobilityId: number | null = null;
  homeInstitutionId: number | null = null;
  statusId: ApplicationStatus | null = null;
  calls: Call[] = [];
  callId: number | null = null;
  selectedCallId: number | null = null;
  selectedMobilityId: number | null = null;
  selectedHomeInstitutionId: number | null = null;
  selectedStatusId: number | null = null;
  isCoordinator: boolean = false;


  constructor(
    private applicationService: ApplicationService,
    private mobilityService: MobilityService,
    private homeInstitutionsService: HomeInstitutionsService,
    private toastService: ToastService,
    private callService: CallService,
    private accountService: AccountService) { }


  ngOnInit(): void {
    this.isCoordinator = this.accountService.isCoordinator(); 

    if (this.isCoordinator) {
      this.getCoordinatorHomeInstitution();
    } else {
      this.loadInitialData();
    }
  }

  getAllApplications(): void {
    this.applicationService.getAllApplications(this.currentPage, this.searchKey, this.mobilityId, this.homeInstitutionId, itemsPerPage, this.statusId, this.callId).subscribe(
      {
        next: (result) => {
          if (!result.success) {
            this.toastService.showErrorsToast(result.errors);
          }
          else {
            // this.paginatedResult = result.data;
            // console.log("paginated",this.paginatedResult);
            result.data.data = result.data.data.map((application: AdminApplication) => {
              if (!application.personal_details) {
                application.personal_details = { application_id: 0, fornames: 'N/A', surname: 'N/A' };
              }
              return application;
            });
  
            this.paginatedResult = result.data;
            // console.log("paginated", this.paginatedResult);
          }
        }
      }
    )
  }

  getAllMobilities(): void {
    this.mobilityService.getAll().subscribe(
      {
        next: (result) => {
          if (!result.success) {
            this.toastService.showErrorsToast(result.errors);
          }
          else {
            this.mobilities = result.data;
          }
        }
      }
    )
  }

  getAllHomeInstitutions(): void {
    this.homeInstitutionsService.getAll().subscribe(
      {
        next: (result) => {
          if (!result.success) {
            this.toastService.showErrorsToast(result.errors);
          }
          else {
            this.homeInstitutions = result.data;
          }
        }
      }
    )
  }

  getAllCalls(): void {
    this.callService.getAll().subscribe(
      {
        next: (result) => {
          if (!result.success) {
            this.toastService.showErrorsToast(result.errors);
          }
          else {
            this.calls = result.data;
            // Sort calls by start_date in descending order
            this.calls.sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());

          // Set the selected call to the last one by start_date
            if (this.calls.length > 0) {
              this.selectedCallId = this.calls[0].id;
              this.callId = this.selectedCallId;
              localStorage.setItem('selectedCallId', this.selectedCallId?.toString() || '');
            }

            // Refresh applications with the new selected call
            this.getAllApplications();
          }
        }
      }
    );
  }

  changeMobility(e: any): void {
    this.currentPage = 1;
    this.selectedMobilityId = e.target.value === 'null' ? null : +e.target.value;
    this.mobilityId = this.selectedMobilityId;
    localStorage.setItem('selectedMobilityId', this.selectedMobilityId?.toString() || '');
    this.getAllApplications();
  }

  changeHomeInstitution(e: any): void {
    this.currentPage = 1;
    this.selectedHomeInstitutionId = e.target.value === 'null' ? null : +e.target.value;
    this.homeInstitutionId = this.selectedHomeInstitutionId;
    localStorage.setItem('selectedHomeInstitutionId', this.selectedHomeInstitutionId?.toString() || '');
    this.getAllApplications();
  }
  changeApplicationStatus(e: any): void {
    this.currentPage = 1;
    this.selectedStatusId = e.target.value === 'null' ? null : +e.target.value;
    this.statusId = this.selectedStatusId;
    localStorage.setItem('selectedStatusId', this.selectedStatusId?.toString() || '');
    this.getAllApplications();
  }

  changeCall(e: any): void {
    this.currentPage = 1;
    this.selectedCallId = e.target.value === 'null' ? null : +e.target.value;
    this.callId = this.selectedCallId;
    localStorage.setItem('selectedCallId', this.selectedCallId?.toString() || '');
    this.getAllApplications();
  }
  

  search(): void {
    this.currentPage = 1;
    this.getAllApplications();
  }

  pageChangeEvent(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.getAllApplications();
  }

  getCoordinatorHomeInstitution(): void {
    const userId = this.accountService.getUserId();
    this.applicationService.getHomeInstitutionIdByUserId(userId!).subscribe({
      next: (result) => {
        if (result.success) {
          this.selectedHomeInstitutionId = result.data;
          this.homeInstitutionId = this.selectedHomeInstitutionId;
          localStorage.setItem('selectedHomeInstitutionId', this.selectedHomeInstitutionId?.toString() || '');
          this.loadInitialData();
        } else {
          this.toastService.showErrorsToast(result.errors);
        }
      }
    });
  }

  loadInitialData(): void {
    this.getAllCalls();
    this.getAllMobilities();
    this.getAllHomeInstitutions();
    const savedCallId = localStorage.getItem('selectedCallId');
    const savedMobilityId = localStorage.getItem('selectedMobilityId');
    const savedHomeInstitutionId = localStorage.getItem('selectedHomeInstitutionId');
    const savedStatusId = localStorage.getItem('selectedStatusId');
  
    if (savedCallId) {
      this.selectedCallId = +savedCallId;
      this.callId = this.selectedCallId; 
    }
  
    if (savedMobilityId) {
      this.selectedMobilityId = +savedMobilityId;
      this.mobilityId = this.selectedMobilityId;
    }
  
    if (savedHomeInstitutionId) {
      this.selectedHomeInstitutionId = +savedHomeInstitutionId;
      this.homeInstitutionId = this.selectedHomeInstitutionId;
    }
  
    if (savedStatusId) {
      this.selectedStatusId = +savedStatusId;
      this.statusId = this.selectedStatusId;
    }
  
    this.getAllApplications();
  }

  

}
