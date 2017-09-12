import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CommonService, UserService } from '../_services';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {

  public forgotPasswordForm: FormGroup;
	public submitted: boolean = false;
  loading: boolean = false;
  unauthorizedError: boolean = false;
  serverError: boolean = false;
  private credentials;
  successMsg: boolean = false;

  constructor(private _fb: FormBuilder,
  			private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private commonService: CommonService) { }

  ngOnInit() {
  	this.buildForgotPasswordForm();
  }

  buildForgotPasswordForm(): void {
    this.forgotPasswordForm = this._fb.group({
      email: ['', [
          Validators.required,
           Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ]
      ]
    });
  }

  onSubmit(isValid: boolean) {
    this.submitted = true;
    this.unauthorizedError = false;
    this.serverError = false;
    this.credentials = this.forgotPasswordForm.value;
    if(isValid) {
      this.loading = true;
        this.userService.forgotPassword(this.credentials.email)
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

}
