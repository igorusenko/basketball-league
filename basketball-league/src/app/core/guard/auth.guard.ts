import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {UserDataInterface} from "../interfaces/user-data-interface";

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    _next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (localStorage.getItem('user')) {
      let user: UserDataInterface = JSON.parse(localStorage.getItem('user')!.toString());
      this.authService.setUser(user);
    }
    if (this.authService.user) {
      return true
    }
    else {
     return this.router.navigate(['sign-in']).then(x => {
        return false
      })
    }
  }

}

