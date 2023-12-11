import {FormControl, Validators} from "@angular/forms";

export interface SignInForm {
  login: FormControl<string | null>;
  password: FormControl<string | null>;
}
