import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {

  constructor() { }

  getEmailPattern() {
  	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  getPasswordPattern() {
  	return '';
  }

  getNamePattern() {
  	return '';
  }

  getPhonePattern() {
  	return '';
  }

  getNumberAndDotPattern() {
  	return '';
  }

}
