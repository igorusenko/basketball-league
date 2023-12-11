import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function samePasswordValidator(controlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordControl = control.root.get(controlName);

    if (passwordControl) {
      const passwordValue = passwordControl.value;
      const confirmPasswordValue = control.value;

      if (passwordValue !== confirmPasswordValue) {
        return { 'passwordMismatch': true };
      }
    }

    return null;
  };
}
