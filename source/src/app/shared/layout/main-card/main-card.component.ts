import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonalDetailsService } from 'src/app/personal-details/services/personal-details.service';
import { routeCheck } from '../../helpers/route-checker';

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

  applicationId: number | undefined;
  fullName: string = '';


  constructor(private route: ActivatedRoute,private personalDetailsService: PersonalDetailsService) { }
  ngOnInit(): void {
    this.applicationId = routeCheck(this.route);
    // console.log(this.applicationId);
    if (this.applicationId){
      this.getFullName();
    }
    
  }

  getFullName() {
    this.personalDetailsService.getByApplicationId(this.applicationId!).subscribe(
      {
        next: (result) => {
          if (result.success) {
            this.fullName = result.data.form?.surname + " " + result.data.form?.fornames;
            // console.log(this.fullName);
          }
        },
        error: (error) => {
          console.error('Error retrieving personal details:', error);
        }
      }
    )
  }
}
