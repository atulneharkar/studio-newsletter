import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { User } from '../_interfaces';
import { CommonService } from '../_services';

@Injectable()
export class UserService {
  constructor(
      private http: Http,
      private commonService: CommonService) { }

  getAll() {
    return this.http.get(`${this.commonService.getDomainUrl()}/user/list/all`, this.commonService.getJwt()).map((response: Response) => response.json());
  }

  getById(id: number) {
    return this.http.get(`${this.commonService.getDomainUrl()}/user/` + id, this.commonService.getJwt()).map((response: Response) => response.json());
  }

  create(user: User) {
    return this.http.post(`${this.commonService.getDomainUrl()}/user/create`, user).map((response: Response) => response);
  }

  update(id: number, user: object, updateType: string) {
    return this.http.put(`${this.commonService.getDomainUrl()}/user/` + id, user, this.commonService.getJwt()).map((response: Response) => {
        if(updateType === 'self') {
          this.commonService.setUserCookies(response, '');
        }
      });
  }

  getMyDetails() {
    return this.http.get(`${this.commonService.getDomainUrl()}/user/me`, this.commonService.getJwt()).map((response: Response) => response);
  }
}