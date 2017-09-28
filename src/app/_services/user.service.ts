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

  //method to get list of all users
  getAll() {
    return this.http.get(`${this.commonService.getDomainUrl()}/user/list/all`, this.commonService.getJwt()).map((response: Response) => response.json());
  }

  //method to get user by id
  getById(id: number) {
    return this.http.get(`${this.commonService.getDomainUrl()}/user/` + id, this.commonService.getJwt()).map((response: Response) => response.json());
  }

  //method to create/register new user
  create(user: User) {
    return this.http.post(`${this.commonService.getDomainUrl()}/user/create`, user).map((response: Response) => response);
  }

  //method to update user
  update(id: number, user: object, updateType: string) {
    return this.http.put(`${this.commonService.getDomainUrl()}/user/` + id, user, this.commonService.getJwt()).map((response: Response) => {
        if(updateType === 'self') {
          this.commonService.setUserCookies(response, '');
        }
      });
  }

  //method to check/get current users details
  getMyDetails() {
    return this.http.get(`${this.commonService.getDomainUrl()}/user/me`, this.commonService.getJwt()).map((response: Response) => response);
  }

  //method to get link from backend for resetting users password 
  forgotPassword(user: object) {
    return this.http.post(`${this.commonService.getDomainUrl()}/forgot-password`, user).map((response: Response) => response);
  }

  //method to reset users password
  resetPassword(user: object) {
    return this.http.post(`${this.commonService.getDomainUrl()}/reset-password`, user).map((response: Response) => response);
  }
}