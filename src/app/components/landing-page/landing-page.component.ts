import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BodyPart } from '../../models/body-part.model';
import { SecurityService } from '../../services/security.service';
import{ AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(protected securityService: SecurityService,
              protected auth: AuthService,
                private router: Router) { }

  ngOnInit() {
  }

  getToken(){
    this.securityService.getToken().subscribe(data => {
      const token = data['access_token'];
    if (token) {
      this.auth.setToken(token);
      this.router.navigate(['/dashboard']);
    }
    })
  }

}
