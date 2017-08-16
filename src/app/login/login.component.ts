import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService, CommonService } from '../_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
	public submitted: boolean = false;
	private credentials;
  loading = false;
  private returnUrl: string;
  unauthorizedError: boolean = false;
  serverError: boolean = false;

  constructor(private _fb: FormBuilder,
  			private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private commonService: CommonService) { }

  ngOnInit() {
    let userInfo = this.commonService.getUserCookies();
    if(userInfo) {
      this.router.navigate(['/']);
    }
    this.buildLoginForm();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  buildLoginForm(): void {
    this.loginForm = this._fb.group({
      email: ['', [
          Validators.required,
           Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ]
      ],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(isValid: boolean) {
    this.submitted = true;
    this.unauthorizedError = false;
    this.serverError = false;
    this.credentials = this.loginForm.value;
    if(isValid) {
      this.loading = true;
        this.authenticationService.login(this.credentials.email, this.credentials.password)
          .subscribe(
            data => {
              this.commonService.notifyHeader();
              this.router.navigate([this.returnUrl]);
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
