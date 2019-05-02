import { Component, OnInit } from '@angular/core';
import { Result } from '../../models/result.model';
import { Condition } from '../../models/condition.model';
import { Suggestion } from '../../models/suggestion.model';
import { AppService } from '../../services/app.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent implements OnInit {

  currentPage: number = 1;
  maxSize: number = 6;
  results: Result[];
  totalItems: number;
  condition: Condition;
  suggestions: Suggestion[];

  constructor(protected appService: AppService,
              protected auth: AuthService,
              private router: Router) { }

  ngOnInit() {
      this.getResults();
  }

  getResults(){

    let token = localStorage.getItem('access_token');
    let jwtHelper = new JwtHelperService();
    let decodedToken = jwtHelper.decodeToken(token);

    this.appService.getResultsList(decodedToken.identity, this.currentPage, this.maxSize).subscribe(data => {
        this.results = data['results'];
        this.totalItems = data['count'];

        this.auth.refresh_token();
    })

  }

  setPage(pageNumber: number): void {
  this.currentPage = pageNumber;
  this.getResults();
}






}
