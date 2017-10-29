import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { CommonService, UserService, HelperService } from '../_services';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {

  public resetPasswordForm: FormGroup;
	public submitted: boolean = false;
  public loading: boolean = false;
  public unauthorizedError: boolean = false;
  public serverError: boolean = false;
  private formData: any;
  public successMsg: boolean = false;
  private userId: string;
  private otp: string;
  public message: string = "Password Reset successfully";
  public modalType: string = "success";

  constructor(private _fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        private commonService: CommonService,
        private helperService: HelperService) { }

  ngOnInit() {
    this.getParamId();
  	this.buildResetPasswordForm();
  }

  //method to get userId and otp from url query parameters
  getParamId() {
    this.route.params.subscribe(
      (params : Params) => {
        this.otp = params["otp"];
        this.userId = params["userId"];
      }
    );
  }

  //create reset password form - reactive way
  buildResetPasswordForm(): void {
    this.resetPasswordForm = this._fb.group({
      credentials: this._fb.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      }, { validator: this.helperService.pwdMatcher })
    });
  }

  //handle form submission
  onSubmit(isValid: boolean) {
    this.submitted = true;
    this.unauthorizedError = false;
    this.serverError = false;
    this.formData = {
      otp: this.otp,
      userID: this.userId,
      password: this.resetPasswordForm.value.credentials.password
    };

    if(isValid) {
      this.loading = true;

      //method for resetting users password
      this.userService.resetPassword(this.formData)
        .subscribe(
          data => {
          	this.successMsg = true;
            this.loading = false;
            setTimeout(() => {
              this.successMsg = false;
              this.router.navigate(['/login']);
            }, 3000);
          },
          error => {
            this.loading = false;
            if(error.status === 400) {
              this.unauthorizedError = true;
            } else if(error.status === 500) {
              this.serverError = true;
            }
          });
    }

  }

}
