import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Headers } from '@angular/http';

import { UserService, CommonService, FileUploadService } from '../../_services';
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
  userId: number;
  userInfo: User;
  public designations: any[] = ['BTA', 'Consultant', 'Senior Consultant', 'Manager', 'Senior Manager'];
  selectedDesignation: string = '';
  private imageInfo;
  setDobDate;
  setDojDate;
  private successMsg: boolean = false;

  uploadedFiles = [];
  uploadError;
  uploadFieldName = 'avatar';

  constructor(private _fb: FormBuilder, 
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        private commonService: CommonService,
        private _fileUpload: FileUploadService) { }

  ngOnInit() {
    this.getParamId();

    this.userInfo = this.commonService.getUserCookies();

    if(!this.userId) {
      this.checkIfLoggedIn();
    }

    this.buildUserForm();
  }

  getParamId() {
    this.route.params.subscribe(
      (params : Params) => {
        this.userId = params["id"];
      }
    );
  }

  checkIfLoggedIn() {
    if(this.userInfo) {
      this.router.navigate(['/']);
    }
  }

  buildUserForm(): void {
    //initialize our form 
    this.userForm = this._fb.group({
      name: ['', [
          Validators.required, 
          Validators.minLength(2),
          //Validators.pattern(/^[a-zA-Z]*$/)
        ]
      ],
      email: ['', [
          Validators.required,
          Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ]
      ],
      credentials: this._fb.group({
        password: this.getPwdStructure(),
        confirmPassword: this.getPwdStructure()
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

    if(this.userId) {
      //prefill the form 
      let userObj = this.formatUser(this.userInfo);
      this.selectedDesignation = userObj.designation;

      let dob = new Date(userObj.dob);
      let doj = new Date(userObj.doj);
      this.setDobDate = dob.toISOString().substring(0, 10);
      this.setDojDate = doj.toISOString().substring(0, 10);

      (<FormGroup>this.userForm)
            .setValue(userObj, { onlySelf: true });
    }

  }

  onSubmit(isValid: boolean) {
    this.submitted = true;
    this.user = this.userForm.value;
    if(isValid) {
      this.loading = true;
      if(!this.userId) {
        this.userService.create(this.user)
        .subscribe(
          data => {
              if(this.imageInfo) {
                let headers: Headers;
                let token = data.headers.get('x-auth');
                this.saveImage(this.imageInfo, token);
              } else {
                this.successMsg = true;
                setTimeout(() => {
                  this.loading = false;
                  this.commonService.notifyHeader();
                  this.successMsg = false;
                  this.router.navigate(['/login']);
                }, 3000);
              }
          },
          error => {
              this.loading = false;
          });
      } else {
        this.userService.update(this.userId, this.user, 'self')
        .subscribe(
          data => {
              if(this.imageInfo) {
                this.saveImage(this.imageInfo);
              } else {
                this.successMsg = true;
                setTimeout(() => {
                  this.commonService.notifyHeader();
                  this.successMsg = false;
                  this.router.navigate(['/home']);
                }, 3000);
              }
          },
          error => {
              this.loading = false;
          });
      }
    }

  }

  //capture uploaded file
  profilePicChange(fieldName: string, fileList: FileList) {
    // handle file changes
    this.imageInfo = new FormData();

    if (!fileList.length) return;

    // append the files to FormData
    Array
      .from(Array(fileList.length).keys())
      .map(x => {
        this.imageInfo.append(fieldName, fileList[x], fileList[x].name);
      });
  }

  //save profile pic
  saveImage(data, userToken = null) {
    this._fileUpload.upload(data, userToken)
      .take(1)
      .subscribe(x => {
        this.successMsg = true;
        setTimeout(() => {
          this.commonService.notifyHeader();
          this.loading = false;
          this.successMsg = false;
          if(userToken) {
            this.router.navigate(['/login']);
          } else {
            this.router.navigate(['/home']);
          }
        }, 3000);
      }, err => {
        this.uploadError = err;
      })
  }

  //format user object
  formatUser(user) {
    return {
      name: user.name,
      email: user.email,
      credentials: {
        password: '',
        confirmPassword: ''
      },
      phone: user.phone,
      designation: user.designation,
      avatar: '',
      role: user.role,
      dob: user.dob,
      doj: user.doj
    };
  }

  //to check if pwd is required and return pwd initialization structure
  getPwdStructure() {
    if(!this.userId) {
      return ['', [Validators.required]];
    } else {
      return ['', []];
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
