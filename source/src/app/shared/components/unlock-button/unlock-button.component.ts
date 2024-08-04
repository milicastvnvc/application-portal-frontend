import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { ApplicationProgressService } from 'src/app/application/services/application-progress.service';
import { ApplicationService } from 'src/app/application/services/application.service';
import { FormProgress } from '../../enums/form-progress';

@Component({
  selector: 'app-unlock-button',
  templateUrl: './unlock-button.component.html',
  styleUrls: ['./unlock-button.component.scss']
})
export class UnlockButtonComponent implements OnInit, OnChanges {

  @Input()
  application_id: number | undefined = undefined;

  progress: any = undefined;

  @Input()
  form_name: string | undefined = undefined;

  isUnlocked: boolean | undefined = undefined;

  constructor(
    private applicationProgressService: ApplicationProgressService,
    private applicationService: ApplicationService,
    private toastService: ToastService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.application_id && this.form_name) {
      this.getApplicationProgress();
    }
  }

  ngOnInit(): void {

  }

  getApplicationProgress()
  {
    this.applicationProgressService.getByApplicationId(this.application_id!).subscribe(
      {
        next: (result) => {
          if (!result.success) {
            this.toastService.showErrorsToast(result.errors);
          }
          else {
            this.progress = result.data;
            this.isUnlockedForm();
          }
        }
      }
    )
  }

  closeModal(): void {
    this.toggleLock();
  }

  isUnlockedForm(): void {
    if (this.progress![this.form_name!] == FormProgress.Unlocked)
    {
      this.isUnlocked = true;
    }
    else
    {
      this.isUnlocked = false;
    }
  }

  toggleLock(): void {
    this.applicationProgressService.toggleLock(this.application_id!, this.form_name!, !this.isUnlocked).subscribe(
      {
        next: (result) => {
          if (!result.success) {
            this.toastService.showErrorsToast(result.errors);
          }
          else {

            if (result.data != FormProgress.Unlocked) {

              this.isUnlocked = true;
            }
            else {
              this.isUnlocked = false;
            }
          }
        }
      }
    )
  }

}
