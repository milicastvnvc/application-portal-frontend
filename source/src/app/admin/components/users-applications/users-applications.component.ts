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
  mobilityId: number | undefined = undefined;
  homeInstitutionId: number | undefined = undefined;
  statusId: ApplicationStatus | undefined = undefined;

  constructor(
    private applicationService: ApplicationService,
    private mobilityService: MobilityService,
    private homeInstitutionsService: HomeInstitutionsService,
    private toastService: ToastService) { }


  ngOnInit(): void {
    this.getAllMobilities();
    this.getAllHomeInstitutions();
    this.getAllApplications();
  }

  getAllApplications(): void {
    this.applicationService.getAllApplications(this.currentPage, this.searchKey, this.mobilityId, this.homeInstitutionId, itemsPerPage, this.statusId).subscribe(
      {
        next: (result) => {
          if (!result.success) {
            this.toastService.showErrorsToast(result.errors);
          }
          else {
            this.paginatedResult = result.data;
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

  changeMobility(e: any): void {
    this.currentPage = 1;
    this.mobilityId = e.target.value;
    this.getAllApplications();
  }

  changeHomeInstitution(e: any): void {
    this.currentPage = 1;
    this.homeInstitutionId = e.target.value;
    this.getAllApplications();
  }
  changeApplicationStatus(e: any): void {
    this.currentPage = 1;
    this.statusId = e.target.value;
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

}
