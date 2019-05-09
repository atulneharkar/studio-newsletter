import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService, CommonService, ValidationService } from '../_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
	public submitted: boolean = false;
	private credentials: any;
  public loading: boolean = false;
  private returnUrl: string;
  public unauthorizedError: boolean = false;
  public serverError: boolean = false;

  constructor(private _fb: FormBuilder,
  			private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private commonService: CommonService,
        private validationService: ValidationService) { }

  ngOnInit() {
    let userInfo = this.commonService.getUserCookies();

    //if user already is logged in then navigate to home page
    if(userInfo) {
      this.router.navigate(['/']);
    }

    //call to create login form - reactive method
    this.buildLoginForm();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  //create login form - reactive method
  buildLoginForm(): void {
    this.loginForm = this._fb.group({
      email: ['', [
          Validators.required
        ]
      ],
      password: ['', [Validators.required]]
    });
  }

  //handle form submitiion
  onSubmit(isValid: boolean) {
    this.submitted = true;
    this.unauthorizedError = false;
    this.serverError = false;
    
    const userEmail = this.loginForm.get('email').value;
    const deloitteEmail = userEmail.indexOf('@') !== -1 ? userEmail.substring(0, userEmail.indexOf('@')) : userEmail

    //this.credentials = this.loginForm.value;
    this.credentials = {email: `${deloitteEmail}@deloitte.com`, password: this.loginForm.get('password').value};

    if(isValid) {

      
      

      this.loading = true;

      //call to login method to check if credentilas are valid
      this.authenticationService.login(this.credentials.email, this.credentials.password)
        .subscribe(
          data => {
            this.commonService.notifyHeader();
            this.router.navigate([this.returnUrl]);
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
