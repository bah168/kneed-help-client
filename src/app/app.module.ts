import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingPageComponent,
    DashboardComponent,
    ContactPageComponent,
    SampleResultComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AppService,
              SecurityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
