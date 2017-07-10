import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(email: string, password: string) {
        /*return this.http.post('http://localhost:3000/user/login', JSON.stringify({ email: email, password: password }))
            .map((response: Response) => {
                let user = response.json();
                if (user && user.tokens) {
                  Cookie.set('userInfo', JSON.stringify(user));
                }
            });*/

            //--------------------
            let obj = {
              fname: 'Atul',
              lname: 'Neharkar',
              phone: '1234567890',
              email: 'atul@gmail.com',
              designation: 'consultant',
              avatar: '',
              role: 'admin',
              password: '',
              tokens: 'someToken'
            }

            Cookie.set('userInfo', JSON.stringify(obj));
            return true;

            //---------------
    }

    logout(token: string) {
        /*return this.http.delete('http://localhost:3000/user/logout', JSON.stringify({ token: token }))
            .map((response: Response) => {
        		Cookie.delete('userInfo');
            });*/

          //-----------
            Cookie.delete('userInfo');
          //-----------
    }
}
