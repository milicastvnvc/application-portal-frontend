import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerificationComponent } from './components/verification/verification.component';
import { CaptchaComponent } from './components/captcha/captcha.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    VerificationComponent,
    CaptchaComponent
  ],
  imports: [
    SharedModule
  ]
})
export class AuthModule { }
