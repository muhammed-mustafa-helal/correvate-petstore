import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';

import { Observable } from 'rxjs';

import { UserAuthenticationService } from './user-authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private authenticationService: UserAuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (
      localStorage.getItem('isLoggedIn') === 'true' ||
      this.authenticationService.isLoggedIn
    )
      return true;
    else {
      return this.router.navigate(['/signin']);
    }
  }
}
