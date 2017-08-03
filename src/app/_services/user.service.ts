import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { User } from '../_interfaces';

@Injectable()
export class UserService {
  constructor(private http: Http) { }

  getAll() {
    return this.http.get('http://localhost:3000/user/list/all', this.jwt()).map((response: Response) => response.json());
  }

  getById(id: number) {
    return this.http.get('10.12.168.10:3000/user/' + id, this.jwt()).map((response: Response) => response.json());
  }

  create(user: User) {
    return this.http.post('http://localhost:3000/user/create', user).map((response: Response) => response.json());
  }

  update(id: number, user: object, updateType: string) {
    return this.http.put('http://localhost:3000/user/' + id, user, this.jwt()).map((response: Response) => {
        if(updateType === 'self') {
          this.setUserCookies(response);
        }
      });
  }

  // private helper method to get JWT token
  private jwt() {
    let userToken = Cookie.get('userToken');
    if (userToken) {
      let headers = new Headers({ 'x-auth': userToken });
      return new RequestOptions({ headers: headers });
    }
  }

  // private helper method to set user cookies
  private setUserCookies(user) {
    let userInfo = user.json();
    if (userInfo) {
      Cookie.set('userInfo', JSON.stringify(userInfo));
    }
  }
}