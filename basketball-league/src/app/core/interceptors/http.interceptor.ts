import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "../services/authorization/auth.service";
import {UserDataInterface} from "../interfaces/authorization/user-data-interface";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class HttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('/Auth/SignIn') && !request.url.includes('/Auth/SignUp')) {

      if (localStorage.getItem('user')) {
        let user: UserDataInterface = JSON.parse(localStorage.getItem('user')!.toString())
        const authRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        return this.requestHandler(next, authRequest);
      } else if (this.authService.user) {
        const authRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.authService.user.token}`,
          },
        });
        return this.requestHandler(next, authRequest);
      }
    }
      return this.requestHandler(next, request);
  }

  requestHandler(next: HttpHandler, request: HttpRequest<any>): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/authorization/sign-in']);
        }
        return throwError(error);
      })
    );
  }
}
