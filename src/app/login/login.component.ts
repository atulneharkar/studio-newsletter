import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { AuthenticationService } from '../_services';

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
        private authenticationService: AuthenticationService) { }

  ngOnInit() {
    const userInfo = JSON.parse(Cookie.get('userInfo'));
    if(userInfo && userInfo.tokens) {
      this.router.navigate(['/']);
    }
    this.buildLoginForm();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  buildLoginForm(): void {
    //initialize our form 
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
        /*this.authenticationService.login(this.credentials.email, this.credentials.password)
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  this.loading = false;
              });*/

              //---------

             let authenticate = this.authenticationService.login(this.credentials.email, this.credentials.password);
             if(authenticate) {
               this.router.navigate([this.returnUrl]);
             }

             //---------- 
    }

  }

}
