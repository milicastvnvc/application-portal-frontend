import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  code: string = '';
  userEmail: string = '';
  showSuccess: boolean = false;
  showError: boolean = false;
  showResendButton: boolean = false;
  message: string = "";
  disableVerificationButton: boolean = false;

  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    const routeParam = this.route.snapshot.paramMap.get('code')
    if (routeParam) {
      this.code = routeParam;
    }

    this.verifyEmail();
  }

  verifyEmail(): void {
    this.authService.verifyEmail(this.code).subscribe(
      {
        next: (result) => {
          if (result.success) {
            this.message = result.data;
            this.showSuccess = true;
          }
          else {
            if (result.data != null) {
              this.userEmail = result.data;
              this.showResendButton = true;
            }

            this.message = result.errors[0];
            this.showError = true;
          }
        }
      })
  }

  resendVerificationCode(): void {
    this.authService.sendVerifyCode(this.userEmail, false).subscribe(
      {
        next: (result) => {
          if (result.success) {
            this.toastService.showSuccessToast('Please check your email for verification link.');
            this.disableVerificationButton = true;
          }
          else {
            this.toastService.showErrorsToast(result.errors);
          }
        }
      }
    )
  }
}
