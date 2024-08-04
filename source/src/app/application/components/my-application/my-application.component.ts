import { Component, Input, OnInit } from '@angular/core';
import { ApplicationStatus } from 'src/app/shared/enums/application-status';


@Component({
  selector: 'app-my-application',
  templateUrl: './my-application.component.html',
  styleUrls: ['./my-application.component.scss']
})
export class MyApplicationComponent implements OnInit{

  @Input()
  id!: number;

  @Input()
  homeInstitution: string = '';

  @Input()
  mobility: string = '';

  @Input()
  dateCreated!: Date

  @Input()
  status!: ApplicationStatus;

  ngOnInit(): void {
  }

}
