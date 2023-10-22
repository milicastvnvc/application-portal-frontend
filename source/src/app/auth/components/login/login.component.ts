import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import { emailValidator } from 'src/app/shared/helpers/validators/email-validator';
import { environment } from 'src/environments/environment.development';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  protected loginFormGroup!: FormGroup;
  submitted = false;
  shouldVerify = false;
  verifyMessage = 'We sent you link for verifying your email.';
  //clientId: string = environment.googleClientId;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, emailValidator()]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    //this.setGoogleSignIn();
  }

  get f() { return this.loginFormGroup.controls; }

  onSubmit() {

    this.submitted = true;

    if (this.loginFormGroup.invalid) {
      return;
    }

    this.authService.login(this.loginFormGroup.value).subscribe(
      {
        next: (result) => {
          if (result.success) {
            this.router.navigate(['/applications']);
          }
          else {
            if (result.data) {
              if (result.data.user) {
                if (result.data.user.email_verified_at)
                  this.shouldVerify = true;
              }
            }
            this.toastService.showErrorsToast(result.errors);
          }
        }
      }
    )
  }

  // GOOGLE LOGIN - TODO

  // async handleCredentialResponse(response: CredentialResponse) {
  //   this.authService.loginWithGoogle(response.credential).subscribe(
  //     {
  //       next: (result) => {
  //       },
  //       error: error => {
  //         this.toastService.showErrorsToast([error.error.message]);
  //       }
  //     }
  //   );
  // }

  // setGoogleSignIn(): void {
  //   if (document.readyState === "complete") {
  //     this.googleSignInInitialization();
  //   }
  //   else {
  //     window.onload = () => {
  //       this.googleSignInInitialization();
  //     };
  //   }
  // }

  // googleSignInInitialization(): void {
  //   // @ts-ignore
  //   google.accounts.id.initialize({
  //     client_id: this.clientId,
  //     callback: this.handleCredentialResponse.bind(this),
  //     auto_select: false,
  //     cancel_on_tap_outside: true
  //   });
  //   // @ts-ignore
  //   google.accounts.id.renderButton(
  //     // @ts-ignore
  //     document.getElementById("btn-google"),
  //     { theme: "outline", size: "large", width: "400", locale: "en_us" }
  //   );
  //   // @ts-ignore
  //   google.accounts.id.prompt((notification: PromptMomentNotification) => { });
  // }

}

