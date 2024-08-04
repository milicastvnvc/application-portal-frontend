import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControlOptions } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RegisterUser } from '../../../auth/models/register_user';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ConfirmedValidator } from 'src/app/shared/helpers/validators/confirmed-validator';
import { emailValidator } from 'src/app/shared/helpers/validators/email-validator';
import { CaptchaComponent } from '../captcha/captcha.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  protected registerFormGroup!: FormGroup;
  @ViewChild('captcha') captcha!: CaptchaComponent;

  submitted: boolean = false;
  disableSubmitButton: boolean = false;


  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
    private router: Router) { }

  ngOnInit() {
    const formOptions: AbstractControlOptions = { validators: ConfirmedValidator('password', 'confirmPassword') };

    this.registerFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, emailValidator()]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, formOptions);
  }

  get f() { return this.registerFormGroup.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerFormGroup.invalid || !this.captcha.captchaSuccess) {
      return;
    }

    let user: RegisterUser = {
      email: this.registerFormGroup.value.email,
      password: this.registerFormGroup.value.password,
      confirm_password: this.registerFormGroup.value.confirmPassword
    }

    this.authService.register(user).subscribe(
      {
        next: (result) => {
          if (result.success) {
            this.toastService.showSuccessToast(result.data);
            this.disableSubmitButton = true;
            setTimeout(() => {
              this.router.navigate(['login']);
            }, 5000);
          }
          else {
            this.toastService.showErrorsToast(result.errors);
          }
        }
      }
    )
  }
}
