import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from './directives/pagination/pagination.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment'

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AppRoutingModule } from './routes/app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { SampleResultComponent } from './components/sample-result/sample-result.component';

import { AppService } from './services/app.service';
import { SecurityService } from './services/security.service';
import { AuthService } from './services/auth.service';
import { FooterComponent } from './components/footer/footer.component';
import { MapComponent } from './components/map/map.component';
import { ResultsListComponent } from './components/results-list/results-list.component';
import { ResultDetailComponent } from './components/result-detail/result-detail.component';

import { AlertComponent } from './directives/alert/alert.component';
import { AlertService } from './services/alert.service';

export function jwtTokenGetter() {
  return localStorage.getItem('access_token');
}


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingPageComponent,
    DashboardComponent,
    ContactPageComponent,
    FooterComponent,
    MapComponent,
    ResultsListComponent,
    ResultDetailComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    NgxPaginationModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter,
        whitelistedDomains: [environment.whiteList]
      }
    })
  ],
  providers: [AppService,
              SecurityService,
              AuthService,
              AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
