import {SignInForm} from "./sign-in-form";
import {FormControl} from "@angular/forms";

export interface SignUpForm extends SignInForm{
  userName: FormControl<string | null>;
  samePassword: FormControl<string | null>;
  isAcceptedPrivacy: FormControl<boolean | null>
}
