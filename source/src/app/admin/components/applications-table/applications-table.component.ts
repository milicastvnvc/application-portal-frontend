import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Application } from 'src/app/application/models/application';
import { itemsPerPage, maxPage } from 'src/app/shared/helpers/constants';
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

  constructor() {}

  ngOnInit(): void {
    console.log(this.applications);
  }

  onPageChange(number: number) {
    this.currentPage = number;
    this.pageChangeEmitter.emit(this.currentPage);
  }
}
