import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) { }

  login(email: string, password: string) {
    return this.http.post('http://localhost:3000/user/login', { email: email, password: password })
      .map((response: Response) => {
        let user = response.json();
        let headers: Headers;
        let token = response.headers.get('x-auth');
        if (user) {
          Cookie.set('userInfo', JSON.stringify(user));
          Cookie.set('userToken', token);
        }
    });
  }
}
