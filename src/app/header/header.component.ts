import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
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
  private currentUrl: string;

  constructor(private router: Router,
        private authenticationService: AuthenticationService,
        private commonService: CommonService,
        private ref: ChangeDetectorRef,
        private userService: UserService) { }

  ngOnInit() {
    this.getUserInfo();
    this.getCurrentUrl();

    this.subscription = this.commonService.notifyObservable$.subscribe(() => {
      this.getUserInfo();
    });

    this.checkUserStatus();
  }

  //method to get current route from the url
  getCurrentUrl() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd ) {
        this.currentUrl = event.url;
      }
    });
  }

  //method to get user information from cookies
  getUserInfo() {
    this.userInfo = this.commonService.getUserCookies();
    this.ref.detectChanges();
  }

  //method to check if user's status is active otherwise logout the user
  checkUserStatus() {
    this.userService.getMyDetails()
      .subscribe(
        data => {
          
        },
        error => {
          const shouldNavigate = (this.currentUrl !== '/register' && this.currentUrl !== '/forgot-password' && this.currentUrl.indexOf('reset-password') === -1);
          if(error.statusText === 'Unauthorized' && shouldNavigate) {
            this.logout();
          }
        });
  }

  //method to logout the user
  logout() {
    this.commonService.deleteUserCookies();
    this.getUserInfo();
  	this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
