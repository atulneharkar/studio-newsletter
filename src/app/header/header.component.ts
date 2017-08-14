import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthenticationService, CommonService, UserService } from '../_services';
import { User } from '../_interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

	private token: string;
  public userInfo: User;
  private subscription: Subscription;

  constructor(private router: Router,
        private authenticationService: AuthenticationService,
        private commonService: CommonService,
        private ref: ChangeDetectorRef,
        private userService: UserService) { }

  ngOnInit() {
    this.getUserInfo();

    this.subscription = this.commonService.notifyObservable$.subscribe(() => {
      this.getUserInfo();
    });

    //check status of the logged in user
    this.userService.getMyDetails()
        .subscribe(
          data => {
            
          },
          error => {
            if(error.statusText === 'Unauthorized') {
              this.logout();
            }
          });
  }

  getUserInfo() {
    this.userInfo = this.commonService.getUserCookies();
    this.ref.detectChanges();
  }

  logout() {
    this.commonService.deleteUserCookies();
    this.getUserInfo();
  	this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
