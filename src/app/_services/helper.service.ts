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

  //method to check if fromDate is less than toDate and fromTime is less than toTime
  dateTimeCompare = (control: AbstractControl): {[key: string]: boolean} => {
    const fromDate = Date.parse(control.get('fromDate').value);
    const toDate = Date.parse(control.get('toDate').value);
    const fromTime = (new Date("November 13, 2013 " + (control.get('fromTime').value))).getTime();
    const toTime = (new Date("November 13, 2013 " + (control.get('toTime').value))).getTime();
    if (!fromDate || !toDate || !fromTime || !toTime) {
      return null;
    }

    if(fromDate > toDate) {
      return { dateError: true };
    }

    if(fromDate === toDate) {
      if(fromTime > toTime) {
        return { timeError: true };
      }
    }
  };

  //format date
  getFormattedDate(date) {
    let d = new Date(date);
    let month = ((d.getMonth()+1) < 10) ? ("0"+(d.getMonth()+1)) : (d.getMonth()+1);
    let day = (d.getDate() < 10) ? ("0"+d.getDate()) : d.getDate();
    return d.getFullYear() + "-" + month + "-" + day;
  }

  //format time
  getFormattedTime(date) {
    let d = new Date(date);
    let hr: any = d.getHours();
    let min: any = d.getMinutes();

    if (hr < 10) {
        hr = "0" + hr;
    }
    if (min < 10) {
        min = "0" + min;
    }

    return hr + ":" + min;
  }

}
