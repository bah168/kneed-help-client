import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SecurityService } from './security.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(public jwtHelper: JwtHelperService,
              protected security: SecurityService,
              private router: Router) {}

  public decodeToken() {
    const token = localStorage.getItem('access_token');
    return this.jwtHelper.decodeToken(token);
  }

  public isAuthenticated(): boolean {
    // Check whether the token is expired
    const token = localStorage.getItem('access_token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  setToken(token: string) {
  localStorage.setItem('access_token', token);
}

refresh_token() {
  if (this.isAuthenticated()) {
    this.security.refreshToken()
      .subscribe(data => {
        const token = data['access_token'];
        if (token) this.setToken(token);
        else this.router.navigate(['/']);
      }
      );
  }
}

}
