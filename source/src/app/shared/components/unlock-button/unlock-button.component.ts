import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UnlockedFormsService } from 'src/app/admin/services/unlocked-forms.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-unlock-button',
  templateUrl: './unlock-button.component.html',
  styleUrls: ['./unlock-button.component.scss']
})
export class UnlockButtonComponent implements OnInit, OnChanges {

  @Input()
  application_id: number | undefined = undefined;

  @Input()
  form_name: string | undefined = undefined;

  isUnlocked: boolean | undefined = undefined;

  constructor(
    private unlockedFormsService: UnlockedFormsService,
    private toastService: ToastService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.application_id && this.form_name) {
      this.isUnlockedForm();
    }
  }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.toggleLock();
  }

  isUnlockedForm(): void {
    this.unlockedFormsService.getUnlockedForm(this.application_id!, this.form_name!).subscribe(
      {
        next: (result) => {
          if (!result.success) {
            this.toastService.showErrorsToast(result.errors);
          }
          else {
            if (result.data) this.isUnlocked = true;
            else this.isUnlocked = false;
          }
        }
      }
    )
  }

  toggleLock(): void {
    this.unlockedFormsService.toggleLock(this.application_id!, this.form_name!, !this.isUnlocked).subscribe(
      {
        next: (result) => {
          if (!result.success) {
            this.toastService.showErrorsToast(result.errors);
          }
          else {
            if (result.data) {
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
