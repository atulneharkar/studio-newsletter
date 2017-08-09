import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { CommonService } from '../_services';

@Injectable()
export class AuthenticationService {
  constructor(
      private http: Http,
      private commonService: CommonService) { }

  login(email: string, password: string) {
    return this.http.post(`${this.commonService.getDomainUrl()}/user/login`, { email: email, password: password })
      .map((response: Response) => {
        let headers: Headers;
        let token = response.headers.get('x-auth');
        if (response && token) {
          this.commonService.setUserCookies(response, token);
        }
    });
  }
}
