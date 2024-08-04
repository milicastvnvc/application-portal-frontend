import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { HttpClientModule } from '@angular/common/http';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ToastComponent } from './components/toast/toast.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { TooglePasswordDirective } from './directives/toogle-password.directive';
import { TruncatePipe } from './pipes/truncate.pipe';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MainCardComponent } from './layout/main-card/main-card.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FieldsetComponent } from './layout/fieldset/fieldset.component';
import { AuthCardComponent } from './layout/auth-card/auth-card.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';
import { ModalComponent } from './components/modal/modal.component';
import { MobileScreenDirective } from './directives/mobile-screen.directive';
import { BackLinkComponent } from './components/back-link/back-link.component';
import { UnlockButtonComponent } from './components/unlock-button/unlock-button.component';
import { ApplicationStatusComponent } from './components/application-status/application-status.component';

@NgModule({
  declarations: [
    ForbiddenComponent,
    LoaderComponent,
    NotFoundComponent,
    NavbarComponent,
    MainCardComponent,
    ToastComponent,
    ToasterComponent,
    TooglePasswordDirective,
    MobileScreenDirective,
    TruncatePipe,
    FieldsetComponent,
    AuthCardComponent,
    FooterComponent,
    SubmitButtonComponent,
    ModalComponent,
    MobileScreenDirective,
    BackLinkComponent,
    UnlockButtonComponent,
    ApplicationStatusComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    LoaderComponent,
    ForbiddenComponent,
    NotFoundComponent,
    NavbarComponent,
    MainCardComponent,
    FieldsetComponent,
    AuthCardComponent,
    SubmitButtonComponent,
    FooterComponent,
    ToastComponent,
    ToasterComponent,
    BackLinkComponent,
    ModalComponent,
    ApplicationStatusComponent,
    TooglePasswordDirective,
    MobileScreenDirective,
    TruncatePipe,
    NgxSkeletonLoaderModule
  ]
})
export class SharedModule { }
