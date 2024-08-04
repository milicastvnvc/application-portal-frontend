import { Component, Input, OnInit } from '@angular/core';
import { ApplicationStatus } from '../../enums/application-status';
import { statusConstant } from 'src/app/admin/helpers/constants';

@Component({
  selector: 'app-application-status',
  templateUrl: './application-status.component.html',
  styleUrls: ['./application-status.component.scss']
})
export class ApplicationStatusComponent implements OnInit {

  @Input()
  status : ApplicationStatus = ApplicationStatus.Created;
  label : string = "In Progress";
  class: string = "text-warning";

  allStatus = statusConstant;

  ngOnInit(): void {
    for (let i = 0; i < this.allStatus.length; i++) {
      if (this.allStatus[i].id == this.status)
      {
        this.label = this.allStatus[i].label;
        this.class = this.allStatus[i].color;
        break;
      }
    }
  }

}
