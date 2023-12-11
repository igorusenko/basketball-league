import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SignUpForm} from "../../core/forms/sign-up-form";
import {AuthService} from "../../core/services/auth.service";
import {SignUpInterface} from "../../core/interfaces/sign-up-interface";
import {samePasswordValidator} from "../../core/forms/validators/same-password-validator";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{

  signUpForm: FormGroup<SignUpForm>;

  constructor(private authService: AuthService,
              private _fb: FormBuilder) {

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
    this.authService.register(this.createModel).subscribe(x => {

    })
  }

}
