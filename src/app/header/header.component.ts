import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

	private token: string;

  constructor(private router: Router,
        private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  logout() {
  	//get token from cookies
    //this.token = 
    this.authenticationService.logout(this.token)
      .subscribe(
          data => {
          		//remove token from cookies

              this.router.navigate(['/login']);
          },
          error => {

          });
  }

}
