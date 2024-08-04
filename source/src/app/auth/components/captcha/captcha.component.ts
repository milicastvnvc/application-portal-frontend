import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ReCaptcha2Component } from 'ngx-captcha';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent implements OnInit {

  @ViewChild('captchaElem') captchaElem!: ReCaptcha2Component;
  @ViewChild('captchaSuccess') captchaSuccess: boolean = false;

  public captchaIsLoaded = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;
  public useGlobalDomain: boolean = false;
  public siteKey = environment.recaptcha.siteKey;

  public theme: 'light' | 'dark' = 'light';
  public size: 'compact' | 'normal' = 'normal';
  public lang = 'en';
  public type: 'image' | 'audio' = 'image';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
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
