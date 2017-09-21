import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class HelperService {

  constructor() { }

  //method to check if password matches
  pwdMatcher = (control: AbstractControl): {[key: string]: boolean} => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (!password || !confirmPassword) {
      return null;
    }
    return password.value === confirmPassword.value ? null : { nomatch: true };
  };

  //method to check if fromDate is less than toDate
  dateCompare = (control: AbstractControl): {[key: string]: boolean} => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (!password || !confirmPassword) {
      return null;
    }
    return password.value === confirmPassword.value ? null : { dateError: true };
  };

  //method to check if fromTime is less than toTime
  timeCompare = (control: AbstractControl): {[key: string]: boolean} => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (!password || !confirmPassword) {
      return null;
    }
    return password.value === confirmPassword.value ? null : { timeError: true };
  };

}
