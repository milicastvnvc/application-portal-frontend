import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss']
})
export class SubmitButtonComponent implements OnInit {

  @Input()
  isDisabled: boolean = true;

  @Input()
  buttonText: string = '';

  isAdmin:boolean = false;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.isAdmin = this.accountService.isAdmin();
  }
}
