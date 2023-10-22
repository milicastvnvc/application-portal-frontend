import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ConfirmedValidator } from 'src/app/shared/helpers/validators/confirmed-validator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  protected resetPassFormGroup!: FormGroup;
  submitted = false;
  loading = false;
  successMessage = "";
  successful = false;
  code: string = "";

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    const formOptions: AbstractControlOptions = { validators: ConfirmedValidator('password', 'confirmPassword') };

    this.resetPassFormGroup = this.formBuilder.group({
      code: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, formOptions);

    const routeParam = this.route.snapshot.paramMap.get('code')
    if (routeParam) {
      this.code = routeParam;
      this.resetPassFormGroup.patchValue({
        code: this.code,
      });
    }
  }


  get f() { return this.resetPassFormGroup.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.resetPassFormGroup.invalid) return;

    this.authService.resetPassword(this.resetPassFormGroup.value).subscribe(
      {
        next: (result) => {
          if (result.success) {
            this.toastService.showSuccessToast(result.data);
            this.successful = true;
            setTimeout(() => {
              this.router.navigate(['login']);
            }, 3000);
          }
          else {
            this.toastService.showErrorsToast(result.errors);
          }
        }
      }
    )
  }
}
