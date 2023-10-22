import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-card',
  templateUrl: './main-card.component.html',
  styleUrls: ['./main-card.component.scss']
})
export class MainCardComponent {

  @Input()
  title: string = '';

  @Input()
  subtitle: string = '';

  @Input()
  headerText: string = '';

  @Input()
  isAdmin: boolean = false;

  @Input()
  application_id: number | undefined = undefined;

  @Input()
  form_name: string | undefined = undefined;
}
