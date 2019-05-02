import { Component, OnInit, Input } from '@angular/core';
import { Condition } from '../../models/condition.model';
import { Suggestion } from '../../models/suggestion.model';
import { Symptom } from '../../models/symptom.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../services/app.service';
import { AuthService } from '../../services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-result-detail',
  templateUrl: './result-detail.component.html',
  styleUrls: ['./result-detail.component.css']
})
export class ResultDetailComponent implements OnInit {

    conditionId:any;
    condition: Condition;
    suggestions: Suggestion[];
    symptoms: Symptom[];
    link: string;

  constructor(private route:ActivatedRoute,
              private router: Router,
              protected appService: AppService,
              protected auth: AuthService,
              private dom: DomSanitizer) { }

  ngOnInit() {

    this.route.params.subscribe(params => { this.conditionId = params['id']; });
    this.getOneResult();

  }

  getOneResult(){

    this.appService.getOneResult(this.conditionId).subscribe(data => {
        this.suggestions = data['suggestions'];
        this.condition = data['condition'];
        this.symptoms = data['symptoms'];

        this.auth.refresh_token();
    })

  }

  VideoURL(link:string,start:string, end:string) {
    this.link = link + '?start=' + start + '&end=' + end;
    return this.dom.bypassSecurityTrustResourceUrl(this.link);
  }

}
