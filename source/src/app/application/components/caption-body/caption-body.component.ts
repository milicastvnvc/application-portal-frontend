import { Component } from '@angular/core';
import { completed, edit, evaluate, not_completed } from 'src/app/shared/helpers/constants';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-caption-body',
  templateUrl: './caption-body.component.html',
  styleUrls: ['./caption-body.component.scss']
})
export class CaptionBodyComponent {

  completed: string = '../../../../assets/' + completed;
  not_completed: string = '../../../../assets/' + not_completed;
  unlocked: string ='../../../../assets/' + edit;
  evaluate: string = '../../../../assets/' + evaluate;
  isAdmin: boolean = false;
  isCoordinator: boolean = false;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.isAdmin = this.accountService.isAdmin();
    this.isCoordinator = this.accountService.isCoordinator();
  }
}
