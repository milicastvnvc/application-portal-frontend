import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControlOptions } from '@angular/forms';
import { ReCaptcha2Component } from 'ngx-captcha';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../../services/auth.service';
import { RegisterUser } from '../../../auth/models/register_user';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ConfirmedValidator } from 'src/app/shared/helpers/validators/confirmed-validator';
import { emailValidator } from 'src/app/shared/helpers/validators/email-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  protected registerFormGroup!: FormGroup;
  @ViewChild('captchaElem') captchaElem!: ReCaptcha2Component;

  submitted: boolean = false;
  disableSubmitButton: boolean = false;

  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;
  public useGlobalDomain: boolean = false;
  public siteKey = environment.recaptcha.siteKey;

  public theme: 'light' | 'dark' = 'light';
  public size: 'compact' | 'normal' = 'normal';
  public lang = 'en';
  public type: 'image' | 'audio' = 'image';

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
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      recaptcha: ['', Validators.required]
    }, formOptions);
  }

  get f() { return this.registerFormGroup.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerFormGroup.invalid || !this.captchaSuccess) {
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

  handleReset(): void {
    this.captchaSuccess = false;
    this.captchaResponse = undefined;
    this.captchaIsExpired = false;
    this.cdr.detectChanges();
  }

  handleSuccess(captchaResponse: string): void {
    this.captchaSuccess = true;
    this.captchaResponse = captchaResponse;
    this.captchaIsExpired = false;
    this.cdr.detectChanges();
  }

  handleLoad(): void {
    this.captchaIsLoaded = true;
    this.captchaIsExpired = false;
    this.cdr.detectChanges();
  }

  handleExpire(): void {
    this.captchaSuccess = false;
    this.captchaIsExpired = true;
    this.cdr.detectChanges();
  }

  getCurrentResponse(): void {
    const currentResponse = this.captchaElem.getCurrentResponse();
    if (!currentResponse) {
      alert('There is no current response - have you submitted captcha?');
    } else {
      alert(currentResponse);
    }
  }

  getResponse(): void {
    const response = this.captchaElem.getResponse();
    if (!response) {
      alert('There is no response - have you submitted captcha?');
    } else {
      alert(response);
    }
  }

  reload(): void {
    this.captchaElem.reloadCaptcha();
  }

  reset(): void {
    this.captchaElem.resetCaptcha();
  }
}
