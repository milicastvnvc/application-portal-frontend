import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-link',
  templateUrl: './back-link.component.html',
  styleUrls: ['./back-link.component.scss']
})
export class BackLinkComponent {

  @Input()
  route: any[] = [];

  @Input()
  isFormDirty: boolean = true;

  constructor(private router: Router) { }

  confirm() {
    this.router.navigate(this.route);
  }
}
