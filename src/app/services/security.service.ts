import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';



@Injectable()
export class SecurityService {
    constructor(private http: HttpClient) { }

    getSecurityServer() {
        return environment.apiUrl;
    }

    getToken(){
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return this.http.get(this.getSecurityServer() + 'api/security/get-token',
      httpOptions);
    }

    refreshToken(){
      return this.http.get(this.getSecurityServer() + 'api/security/refresh-token');
    }

}
