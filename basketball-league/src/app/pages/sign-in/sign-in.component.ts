import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SignInForm} from "../../core/forms/sign-in-form";
import {SignInInterface} from "../../core/interfaces/sign-in-interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup<SignInForm>;

  constructor(private authService: AuthService,
              private _fb: FormBuilder,
              private router: Router) {

  }

  login(): void {
    this.authService.authorize(this.createModel).subscribe({
        next: value => {
          if (value.token) {
            this.authService.setUser(value);
            this.router.navigate(['ui'])
          }
        },
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
