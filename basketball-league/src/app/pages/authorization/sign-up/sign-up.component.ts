import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SignUpForm} from "../../../core/forms/authorization/sign-up-form";
import {AuthService} from "../../../core/services/authorization/auth.service";
import {SignUpInterface} from "../../../core/interfaces/authorization/sign-up-interface";
import {samePasswordValidator} from "../../../core/forms/validators/same-password-validator";
import {Router} from "@angular/router";
import {NotificationService} from "../../../core/services/notification/notification.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{

  signUpForm: FormGroup<SignUpForm>;
  isSubmitted: boolean = false;
  constructor(private authService: AuthService,
              private _fb: FormBuilder,
              private router: Router,
              private notify: NotificationService) {

  }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.signUpForm = this._fb.group({
      login: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
      samePassword: new FormControl<string>('', [Validators.required, samePasswordValidator('password')]),
      userName: new FormControl<string>('', Validators.required),
      isAcceptedPrivacy: new FormControl<boolean>(false, Validators.required)
    })
  }

  get createModel(): SignUpInterface {
    return {
      login: this.signUpForm.value.login!,
      password: this.signUpForm.value.password!,
      userName: this.signUpForm.value.userName!
    }
  }

  register(): void {
    this.isSubmitted = true;
    console.log(this.signUpForm.controls.password.errors)
    if (this.signUpForm.valid && this.signUpForm.controls.isAcceptedPrivacy.value === true)
    this.authService.register(this.createModel).subscribe({
      next: value => {
        if (value.token) {
          this.authService.setUser(value);
          this.router.navigate(['/teams'])
        }
      },
      complete: () => {
        this.notify.showSuccess('Authentication successful!')
      },
      error: error => {
        this.notify.showError(error.error)
      }
    })
  }

}
