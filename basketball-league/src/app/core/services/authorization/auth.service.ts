import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SignInInterface} from "../../interfaces/authorization/sign-in-interface";
import {environment} from "../../../../environments/environment";
import {SignUpInterface} from "../../interfaces/authorization/sign-up-interface";
import {UserDataInterface} from "../../interfaces/authorization/user-data-interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: UserDataInterface | null;

  constructor(private http: HttpClient) {

  }

  authorize(model: SignInInterface): Observable<UserDataInterface> {
    let url = environment.apiUrl + '/Auth/SignIn';
    return this.http.post<UserDataInterface>(url, model);
  }

  register(model: SignUpInterface): Observable<UserDataInterface> {
    let url = environment.apiUrl + '/Auth/SignUp';
    return this.http.post<UserDataInterface>(url, model);
  }

  setUser(user: UserDataInterface): void {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  isAuthenticated(): boolean {
    return !!this.user
  }
}
