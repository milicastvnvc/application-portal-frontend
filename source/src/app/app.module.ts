import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AuthModule } from './auth/auth.module';
import { ApplicationModule } from './application/application.module';
import { PersonalDetailsModule } from './personal-details/personal-details.module';
import { HomeInstitutionModule } from './home-institution/home-institution.module';
import { ProposedHostUniversitiesModule } from './proposed-host-universities/proposed-host-universities.module';
import { MotivationAndAddedValueModule } from './motivation-and-added-value/motivation-and-added-value.module';
import { DocumentsUploadModule } from './documents-upload/documents-upload.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { AdminModule } from './admin/admin.module';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthModule,
    ApplicationModule,
    PersonalDetailsModule,
    HomeInstitutionModule,
    ProposedHostUniversitiesModule,
    MotivationAndAddedValueModule,
    DocumentsUploadModule,
    AdminModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
