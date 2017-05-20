import { FormControl } from '@angular/forms';

export class PhoneValidator {

  static isValid(control: FormControl){
    const re = /0+[0-9]{10,11}$/.test(control.value);

    if (re){
      return null;
    }

    return {
      "invalidPhoneNo": true
    };

  }
}