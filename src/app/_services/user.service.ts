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
    return this.http.post('http://localhost:3000/user/create', user).map((response: Response) => this.setUserCookies(response, 'create'));
  }

  update(id: number, user: object) {
    return this.http.put('http://localhost:3000/user/' + id, user, this.jwt()).map((response: Response) => this.setUserCookies(response, 'update'));
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
  private setUserCookies(user, type) {
    let userInfo = user.json();
    let userToken = user.headers.get('x-auth');
    if (userInfo) {
      Cookie.set('userInfo', JSON.stringify(user));
      if(type === 'create') {
        Cookie.set('userToken', userToken);
      }
    }
  }
}