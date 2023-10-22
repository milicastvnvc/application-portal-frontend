import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { RegisterUser } from '../models/register_user';
import { Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/shared/services/token.service';
import { AccountService } from 'src/app/shared/services/account.service';
import { BaseResponse } from 'src/app/shared/models/base-response';
import { LoginResponse } from '../models/login-response';
import { ResetPasswordRequest } from '../models/reset-password-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = environment.apiURL + '/auth/';

  private _updateNavbar = new Subject<void>();
  get updateNavbar() {
    return this._updateNavbar;
  }

  constructor(private http: HttpClient,
    private tokenService: TokenService,
    private accountService: AccountService
  ) { }

  register(user: RegisterUser): Observable<BaseResponse<string>> {
    return this.http.post<any>(this.apiURL + 'register', user);
  }

  login(user: RegisterUser): Observable<BaseResponse<LoginResponse>> {
    return this.http.post<BaseResponse<LoginResponse>>(this.apiURL + 'login', user)
      .pipe(map((loginResponse: BaseResponse<LoginResponse>) => {
        if (loginResponse.success) {
          this.tokenService.setToken(loginResponse.data.token);
          this.accountService.setUserData(loginResponse.data.user);
          this._updateNavbar.next();
        }
        return loginResponse;
      }));
  }

  sendVerifyCode(email: string, resetPassword: boolean = false): Observable<BaseResponse<string>> {
    return this.http.post<any>(this.apiURL + "send-code", { email: email, resetPassword: resetPassword });
  }

  resetPassword(request: ResetPasswordRequest): Observable<BaseResponse<string>> {
    return this.http.post<any>(this.apiURL + "reset-password", request);
  }

  verifyEmail(code: string): Observable<any> {
    return this.http.get(this.apiURL + `verify/${code}`);
  }

  // loginWithGoogle(credentials: string): Observable<any>
  // {
  //   return this.http.post(this.apiURL + `google-login`, { credentials: credentials });
  // }
}
