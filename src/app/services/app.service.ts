import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { BodyPart } from './../models/body-part.model';
import { Symptom } from './../models/symptom.model';
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

  getSymptomsPaginated(id, page, per_page):Observable<Symptom[]>{
    return this.http.get(this.security.getSecurityServer() + 'api/symptoms',
    { params: new HttpParams().set('subpart_id', id)
    .set('page', page)
    .set('per_page', per_page) })
    .catch((error: any) => Observable.throw(error.error || 'Server error'));
  }

  processResults(body){
    return this.http.post(this.security.getSecurityServer() + 'api/results', body, this.httpOptions)
    .catch((error: any) => Observable.throw(error.error || 'Server error'));
  }

  getResultsList(user_id, page, per_page) {
    return this.http.get(this.security.getSecurityServer() + 'api/results',
  { params: new HttpParams().set('user_id', user_id)
                            .set('page', page)
                            .set('per_page', per_page) })

    .catch((error: any) => Observable.throw(error.error || 'Server error'));
  }

  getOneResult(id){
    return this.http.get(this.security.getSecurityServer() + 'api/result',
        { params: new HttpParams().set('condition_id', id) })
      .catch((error: any) => Observable.throw(error.error || 'Server error'));
  }

  contactUs(body){
    return this.http.post(this.security.getSecurityServer() + 'api/contact_us', body, this.httpOptions)
    .catch((error: any) => Observable.throw(error.error || 'Server error'));
  }


}
