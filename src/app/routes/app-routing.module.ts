// imports from angular modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// imports for app
import { LandingPageComponent } from './../components/landing-page/landing-page.component';
import { DashboardComponent } from './../components/dashboard/dashboard.component';
import { ContactPageComponent } from './../components/contact-page/contact-page.component';
import { MapComponent } from './../components/map/map.component';
import { ResultsListComponent } from './../components/results-list/results-list.component';
import { ResultDetailComponent } from './../components/result-detail/result-detail.component'



const routes: Routes = [
  // MAIN APP ROUTES
  { path: 'home', component: LandingPageComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'results', component: ResultsListComponent },
  { path: 'map/:id', component: MapComponent },
  { path: 'detail/:id', component: ResultDetailComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule {

}
