import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    //check token from cookies
    let userInfo = JSON.parse(Cookie.get('userInfo'));
    if (userInfo) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}