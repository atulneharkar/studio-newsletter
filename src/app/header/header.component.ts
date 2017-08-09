import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthenticationService, CommonService } from '../_services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

	private token: string;
  public userInfo: object;
  private subscription: Subscription;

  constructor(private router: Router,
        private authenticationService: AuthenticationService,
        private commonService: CommonService,
        private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.getUserInfo();

    this.subscription = this.commonService.notifyObservable$.subscribe(() => {
      this.getUserInfo();
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
