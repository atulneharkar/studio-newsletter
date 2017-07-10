import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

	private token: string;

  public userInfo: object;

  constructor(private router: Router,
        private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.userInfo = JSON.parse(Cookie.get('userInfo'));
  }

  logout() {
  	const tokenInfo = JSON.parse(Cookie.get('userInfo'));
    this.token = tokenInfo.tokens;
    /*this.authenticationService.logout(this.token)
      .subscribe(
          data => {
          		//remove token from cookies
              Cookie.delete('userInfo');
              this.router.navigate(['/login']);
          },
          error => {

          });*/

          //-----------
          this.authenticationService.logout(this.token);
          this.router.navigate(['/login']);
          //-----------
  }

}
