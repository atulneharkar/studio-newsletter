import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { UserService } from '../../_services';
import { User } from '../../_interfaces';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})

export class UserComponent implements OnInit {

	public userForm: FormGroup;
	public submitted: boolean = false;
  private user;
  loading = false;
  id: number;

  constructor(private _fb: FormBuilder, 
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService) { }

  ngOnInit() {
    this.getParamId();

    if(!this.id) {
      this.checkIfLoggedIn();
    }

    this.buildUserForm();
  }

  getParamId() {
    this.route.params.subscribe(
      (params : Params) => {
        this.id = params["id"];
      }
    );
  }

  checkIfLoggedIn() {
    let userInfo = JSON.parse(Cookie.get('userInfo'));
    if(userInfo) {
      this.router.navigate(['/']);
    }
  }

  buildUserForm(): void {
    //initialize our form 
    this.userForm = this._fb.group({
      name: ['', [
          Validators.required, 
          Validators.minLength(2),
          Validators.pattern(/^[a-zA-Z]*$/)
        ]
      ],
      email: ['', [
          Validators.required,
          Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ]
      ],
      credentials: this._fb.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      }, { validator: this.pwdMatcher }),
      phone: ['', [
          Validators.required,
          Validators.pattern(/^\d+$/)
        ]
      ],
      designation: ['', [Validators.required]],
      avatar: ['', ''],
      role: ['user', ''],
      dob: ['', [Validators.required]],
      doj: ['', [Validators.required]]
    });

  }

  onSubmit(isValid: boolean) {
    this.submitted = true;
    this.user = this.userForm.value;
    if(isValid) {
      this.loading = true;
        this.userService.create(this.user)
          .subscribe(
            data => {
                this.router.navigate(['/home']);
            },
            error => {
                this.loading = false;
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
