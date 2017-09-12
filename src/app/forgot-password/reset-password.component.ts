import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CommonService, UserService } from '../_services';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {

  public resetPasswordForm: FormGroup;
	public submitted: boolean = false;
  loading: boolean = false;
  unauthorizedError: boolean = false;
  serverError: boolean = false;
  private formData;
  successMsg: boolean = false;

  constructor(private _fb: FormBuilder,
  			private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private commonService: CommonService) { }

  ngOnInit() {
  	this.buildResetPasswordForm();
  }

  buildResetPasswordForm(): void {
    this.resetPasswordForm = this._fb.group({
      credentials: this._fb.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      }, { validator: this.pwdMatcher })
    });
  }

  onSubmit(isValid: boolean) {
    this.submitted = true;
    this.unauthorizedError = false;
    this.serverError = false;
    this.formData = this.resetPasswordForm.value;
    if(isValid) {
      this.loading = true;
        this.userService.resetPassword(this.formData.credentials.password)
          .subscribe(
            data => {
            	this.successMsg = true;
              this.commonService.notifyHeader();
              this.router.navigate(['/login']);
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

  //function to check if pwd matches
  pwdMatcher = (control: AbstractControl): {[key: string]: boolean} => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (!password || !confirmPassword) {
      return null;
    }
    return password.value === confirmPassword.value ? null : { nomatch: true };
  };

}
