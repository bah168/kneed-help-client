import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { BodyPart } from './../models/body-part.model';
import { SecurityService } from './security.service';



@Injectable()
export class AppService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private security: SecurityService
  ) { }


  getBodyParts() {
    return this.http.get(this.security.getSecurityServer() + 'api/body_parts')
      .catch((error: any) => Observable.throw(error.error || 'Server error'));
  }

  getOneBodyPart(id) {
    return this.http.get(this.security.getSecurityServer() + 'api/body_part',
        { params: new HttpParams().set('id', id) })
      .catch((error: any) => Observable.throw(error.error || 'Server error'));
  }

  getSubparts(id) {
    return this.http.get(this.security.getSecurityServer() + 'api/sub_parts',
        { params: new HttpParams().set('id', id) })
      .catch((error: any) => Observable.throw(error.error || 'Server error'));
  }


}
