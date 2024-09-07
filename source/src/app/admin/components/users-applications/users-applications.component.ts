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
import { Contest } from 'src/app/application/models/contest';
import { ContestService } from 'src/app/application/services/contest.service';

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
  contests: Contest[] = [];
  contestId: number | null = null;
  selectedContestId: number | null = null;
  selectedMobilityId: number | null = null;
  selectedHomeInstitutionId: number | null = null;
  selectedStatusId: number | null = null;


  constructor(
    private applicationService: ApplicationService,
    private mobilityService: MobilityService,
    private homeInstitutionsService: HomeInstitutionsService,
    private toastService: ToastService,
    private contestService: ContestService) { }


  ngOnInit(): void {
    this.getAllContests();
    this.getAllMobilities();
    this.getAllHomeInstitutions();
    const savedContestId = localStorage.getItem('selectedContestId');
    const savedMobilityId = localStorage.getItem('selectedMobilityId');
    const savedHomeInstitutionId = localStorage.getItem('selectedHomeInstitutionId');
    const savedStatusId = localStorage.getItem('selectedStatusId');
   
    if (savedContestId) {
      this.selectedContestId = +savedContestId;
      this.contestId = this.selectedContestId; // Postavi sačuvani konkurs
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

  getAllApplications(): void {
    this.applicationService.getAllApplications(this.currentPage, this.searchKey, this.mobilityId, this.homeInstitutionId, itemsPerPage, this.statusId, this.contestId).subscribe(
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

  getAllContests(): void {
    this.contestService.getAll().subscribe(
      {
        next: (result) => {
          if (!result.success) {
            this.toastService.showErrorsToast(result.errors);
          }
          else {
            this.contests = result.data;
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

  changeContest(e: any): void {
    this.currentPage = 1;
    this.selectedContestId = e.target.value === 'null' ? null : +e.target.value;
    this.contestId = this.selectedContestId;
    localStorage.setItem('selectedContestId', this.selectedContestId?.toString() || '');
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
