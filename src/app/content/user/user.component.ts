import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private _fb: FormBuilder, 
        private router: Router,
        private userService: UserService) { }

  ngOnInit() {
    this.buildUserForm();
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
      role: ['', [Validators.required]],
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
