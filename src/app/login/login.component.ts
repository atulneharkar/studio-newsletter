import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

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

  constructor(private _fb: FormBuilder,
  			private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private commonService: CommonService) { }

  ngOnInit() {
    let userInfo = JSON.parse(Cookie.get('userInfo'));
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
            });
    }

  }

}
