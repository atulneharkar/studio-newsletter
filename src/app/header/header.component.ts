import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
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
    this.userInfo = JSON.parse(Cookie.get('userInfo'));
    this.ref.detectChanges();
  }

  logout() {
    Cookie.delete('userInfo');
    Cookie.delete('userToken');
    this.getUserInfo();
  	this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
