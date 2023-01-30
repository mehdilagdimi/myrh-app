import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  console.log(" indie valid")
  const password = control.get('password');
  const repeatpassword = control.get('repeatpassword');

  return password?.value === repeatpassword?.value ? null : { notmatched: true };
};
