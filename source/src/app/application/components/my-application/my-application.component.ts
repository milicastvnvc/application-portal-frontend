import { Component, Input, OnInit } from '@angular/core';


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
  isSubmitted: boolean = false;

  ngOnInit(): void {
  }

}
