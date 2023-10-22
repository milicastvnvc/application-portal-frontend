import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { ForgotPasswordComponent } from './auth/components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import { GuestGuard } from './core/guards/guest.guard';
import { ForbiddenComponent } from './shared/components/forbidden/forbidden.component';
import { VerificationComponent } from './auth/components/verification/verification.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NewApplicationComponent } from './application/components/new-application/new-application.component';
import { ApplicationDataComponent } from './application/components/application-data/application-data.component';
import { PersonalDetailsComponent } from './personal-details/components/personal-details/personal-details.component';
import { HomeInstitutionComponent } from './home-institution/components/home-institution/home-institution.component';
import { ProposedHostUniversitiesComponent } from './proposed-host-universities/components/proposed-host-universities/proposed-host-universities.component';
import { MotivationAndAddedValueComponent } from './motivation-and-added-value/components/motivation-and-added-value/motivation-and-added-value.component';
import { DocumentsUploadComponent } from './documents-upload/components/documents-upload/documents-upload.component';
import { Role } from './shared/enums/role';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { documentsUploadConstant, homeInstitutionConstant, motivationAndAddedValueConstant, personalDetailsConstant, proposedHostUniversitiesConstant } from './application/helpers/constants';

const routes: Routes = [
  { path: '', redirectTo: "/applications", pathMatch: "full" },

  //Auth
  { path: "login", component: LoginComponent, canActivate: [GuestGuard] },
  { path: "register", component: RegisterComponent, canActivate: [GuestGuard] },
  { path: "verify/:code", component: VerificationComponent, canActivate: [GuestGuard] },
  { path: "forgot-password", component: ForgotPasswordComponent, canActivate: [GuestGuard] },
  { path: "reset-password/:code", component: ResetPasswordComponent },

  //Forms
  { path: "applications", component: DashboardComponent, canActivate: [AuthGuard], data: { roles: [Role.Applicant, Role.Admin] } },
  { path: "new-application", component: NewApplicationComponent, canActivate: [AuthGuard], data: { roles: [Role.Applicant] } },
  { path: "application-data/:id", component: ApplicationDataComponent, canActivate: [AuthGuard] },
  { path: "personal-details/:id", component: PersonalDetailsComponent, canActivate: [AuthGuard], data: { form_info: personalDetailsConstant } },
  { path: "home-institution/:id", component: HomeInstitutionComponent, canActivate: [AuthGuard], data: { form_info: homeInstitutionConstant } },
  { path: "proposed-host-universities/:id", component: ProposedHostUniversitiesComponent, canActivate: [AuthGuard], data: { form_info: proposedHostUniversitiesConstant } },
  { path: "motivation-and-added-value/:id", component: MotivationAndAddedValueComponent, canActivate: [AuthGuard], data: { form_info: motivationAndAddedValueConstant } },
  { path: "documents-upload/:id", component: DocumentsUploadComponent, canActivate: [AuthGuard], data: { form_info: documentsUploadConstant } },

  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', pathMatch: 'full', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
