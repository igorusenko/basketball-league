import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/authorization/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SignInForm} from "../../../core/forms/authorization/sign-in-form";
import {SignInInterface} from "../../../core/interfaces/authorization/sign-in-interface";
import {Router} from "@angular/router";
import {NotificationService} from "../../../core/services/notification/notification.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup<SignInForm>;

  constructor(private authService: AuthService,
              private _fb: FormBuilder,
              private router: Router,
              private notify: NotificationService) {

  }

  login(): void {
    this.authService.authorize(this.createModel).subscribe({
        next: value => {
          if (value.token) {
            this.authService.setUser(value);
            this.router.navigate(['teams'])
          }
        },
        complete: () => {
          this.notify.showSuccess('Authentication successful!')
        },
        error: error => {
          this.notify.showError('User with the specified username / password was not found.')
        }
      }
    )
  }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.signInForm = this._fb.group({
      login: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
    })
  }

  get createModel(): SignInInterface {
    return {
      login: this.signInForm.value.login!,
      password: this.signInForm.value.password!,
    }
  }

}
