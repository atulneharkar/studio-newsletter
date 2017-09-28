import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class CommonService {

  private notify = new Subject<any>();

  notifyObservable$ = this.notify.asObservable();

  constructor() { }

  //notify header component to execute function
  public notifyHeader() {
    this.notify.next();
  }

  //method to get JWT token
  getJwt(token = '') {
    let userToken = (token) ? token : Cookie.get('userToken');
    if (userToken) {
      let headers = new Headers({ 'x-auth': userToken });
      return new RequestOptions({ headers: headers });
    }
  }

  //method to set user cookies with jwt token
  setUserCookies(user, token) {
    if (user) {
      Cookie.set('userInfo', JSON.stringify(user.json()));
    }

    if(token) {
      Cookie.set('userToken', token);
    }
  }

  //method to get user cookies
  getUserCookies() {
    return JSON.parse(Cookie.get('userInfo'));
  }

  //method to delete user cookies and token
  deleteUserCookies() {
    Cookie.delete('userInfo');
    Cookie.delete('userToken');
  }

  //method to get the domain url
  getDomainUrl() {
    return 'http://localhost:3000';
    //return 'http://10.12.168.10:3000';
  }

}
