import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {UserDataInterface} from "../interfaces/user-data-interface";

@Injectable()
export class HttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('/Auth/SignIn') && !request.url.includes('/Auth/SignUp')) {

      if (localStorage.getItem('user')) {
        let user: UserDataInterface = JSON.parse(localStorage.getItem('user')!.toString())
        const authRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${user.token}`,
          },
        });
      }
      else if (this.authService.user) {
        const authRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.authService.user.token}`,
          },
        });
      }

    }

    return next.handle(request);
  }
}
