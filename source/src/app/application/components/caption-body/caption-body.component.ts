import { Component } from '@angular/core';
import { completed, not_completed } from 'src/app/shared/helpers/constants';

@Component({
  selector: 'app-caption-body',
  templateUrl: './caption-body.component.html',
  styleUrls: ['./caption-body.component.scss']
})
export class CaptionBodyComponent {

  completed: string = '../../../../assets/' + completed;
  not_completed: string = '../../../../assets/' + not_completed;
}
