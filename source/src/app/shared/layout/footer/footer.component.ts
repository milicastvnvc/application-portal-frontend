import { Component } from '@angular/core';
import { uniLogo } from '../../helpers/constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  uniLogo: string = '../../../../assets/' + uniLogo;

}
