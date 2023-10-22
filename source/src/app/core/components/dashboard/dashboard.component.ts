import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isAdmin:boolean | undefined = undefined;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.isAdmin = this.accountService.isAdmin();
  }

}
