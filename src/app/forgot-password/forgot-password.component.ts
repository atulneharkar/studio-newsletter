import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { CommonService, UserService, ValidationService } from '../_services';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})

export class ForgotPasswordComponent implements OnInit {

  public forgotPasswordForm: FormGroup;
	public submitted: boolean = false;
  public loading: boolean = false;
  public unauthorizedError: boolean = false;
  public serverError: boolean = false;
  private credentials: any;
  public successMsg: boolean = false;
  public message: string = "Email sent to your inbox";
  public modalType: string = "success";

  constructor(private _fb: FormBuilder,
        private router: Router,
        private userService: UserService,
        private commonService: CommonService,
        private validationService: ValidationService) { }

  ngOnInit() {
  	this.buildForgotPasswordForm();
  }

  //create forgot password form - reactive way
  buildForgotPasswordForm(): void {
    this.forgotPasswordForm = this._fb.group({
      email: ['', [
          Validators.required,
          Validators.pattern(this.validationService.getEmailPattern())
        ]
      ]
    });
  }

  //handle form submission
  onSubmit(isValid: boolean) {
    this.submitted = true;
    this.unauthorizedError = false;
    this.serverError = false;
    this.credentials = this.forgotPasswordForm.value;

    if(isValid) {
      this.loading = true;

      //method call to get link via email to users from backend for resetting pwd
      this.userService.forgotPassword(this.credentials)
        .subscribe(
          data => {
            const body = JSON.parse(data['_body']);
          	this.successMsg = true;
            this.loading = false;
            setTimeout(() => {
              this.successMsg = false;
              this.router.navigate([`/reset-password/${body.otp}/${body.userID}`]);
              //this.router.navigate(['/login']);
            }, 3000);
          },
          error => {
            this.loading = false;
            if(error.status === 400 || error.status === 404) {
              this.unauthorizedError = true;
            } else if(error.status === 500) {
              this.serverError = true;
            }
          });
    }

  }

}
