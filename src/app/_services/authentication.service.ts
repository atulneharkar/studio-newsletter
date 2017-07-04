import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(email: string, password: string) {
        return this.http.post('http://localhost:3000/user/login', JSON.stringify({ email: email, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response, save it in cookies
                let user = response.json();
                if (user && user.token) {
                  //localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout(token: string) {console.log('logout');
        return this.http.delete('http://localhost:3000/user/logout', JSON.stringify({ token: token }))
            .map((response: Response) => {
                // remove cookies to log user out
        				//localStorage.removeItem('currentUser');
            });
    }
}
