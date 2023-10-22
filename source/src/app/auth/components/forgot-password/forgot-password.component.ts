import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import { emailValidator } from 'src/app/shared/helpers/validators/email-validator';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  protected forgetFormGroup!: FormGroup;
  submitted = false;
  successful = false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.forgetFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, emailValidator()]]
    })
  }

  get f() { return this.forgetFormGroup.controls; }

  onSubmit() {

    this.submitted = true;

    if (this.forgetFormGroup.invalid) {
      return;
    }

    this.authService.sendVerifyCode(this.forgetFormGroup.controls['email'].value, true).subscribe(
      {
        next: (result) => {
          if (result.success){
            this.toastService.showSuccessToast('Check your email for link for resetting your password');
            this.successful = true;
          }
          else {
            this.toastService.showErrorsToast(result.errors);
          }
        }
      }
    )
  }
}
