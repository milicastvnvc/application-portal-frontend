import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-details-home-institution',
  templateUrl: './details-home-institution.component.html',
  styleUrls: ['./details-home-institution.component.scss']
})
export class DetailsHomeInstitutionComponent {

  @Input()
  homeInstitutionName: string = '';

  @Input()
  homeInstitutionCountry: string = '';
}
