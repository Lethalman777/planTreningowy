import { FormControl } from '@angular/forms';

export function nameValidator(control: FormControl): { [key: string]: any } | null {
  const nameValue = control.value;
  const regexp: RegExp = /^[a-z]+$/i;
  //https://regex101.com/
  return regexp.test(nameValue)
    ? null
    : { onlyLetters: true };
}
