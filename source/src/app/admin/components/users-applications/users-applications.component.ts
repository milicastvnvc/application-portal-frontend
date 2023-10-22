import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from 'src/app/application/models/application';
import { HomeInstitution } from 'src/app/application/models/home-institution';
import { Mobility } from 'src/app/application/models/mobility';
import { ApplicationService } from 'src/app/application/services/application.service';
import { HomeInstitutionsService } from 'src/app/application/services/home-institutions.service';
import { MobilityService } from 'src/app/application/services/mobility.service';
import { itemsPerPage } from 'src/app/shared/helpers/constants';
import { PaginationResult } from 'src/app/shared/models/pagination-result';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-users-applications',
  templateUrl: './users-applications.component.html',
  styleUrls: ['./users-applications.component.scss']
})
export class UsersApplicationsComponent implements OnInit, OnChanges {

  @Input()
  submitted: boolean = true;
  paginatedResult: PaginationResult<Application> | undefined = undefined;
  mobilities: Mobility[] = [];
  homeInstitutions: HomeInstitution[] = [];
  currentPage: number = 1;
  searchKey: string = '';
  mobilityId: number | undefined = undefined;
  homeInstitutionId: number | undefined = undefined;

  constructor(
    private applicationService: ApplicationService,
    private mobilityService: MobilityService,
    private homeInstitutionsService: HomeInstitutionsService,
    private toastService: ToastService) { }


  ngOnChanges(changes: SimpleChanges): void {
    this.getAllApplications();
  }

  ngOnInit(): void {
    this.getAllMobilities();
    this.getAllHomeInstitutions();
  }

  getAllApplications(): void {
    this.applicationService.getAllApplications(this.currentPage, this.searchKey, this.mobilityId, this.homeInstitutionId, itemsPerPage, Number(this.submitted)).subscribe(
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

  search(): void {
    this.currentPage = 1;
    this.getAllApplications();
  }

  pageChangeEvent(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.getAllApplications();
  }

}
