import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Headers } from '@angular/http';

import {
  UserService,
  CommonService,
  FileUploadService,
  HelperService,
  ValidationService } from '../../_services';
import { User } from '../../_interfaces';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})

export class UserComponent implements OnInit {

	public userForm: FormGroup;
	public submitted: boolean = false;
  private user: any;
  public loading = false;
  public userId: number;
  public userInfo: User;
  public designations: any[] = ['AA','BTA', 'Consultant', 'Senior Consultant', 'Manager', 'Senior Manager'];
  public domains: any[] = ['All', 'UX', 'VD', 'QA', 'FE','FX', 'BxD','EM', 'iOS', 'Android'];
  public visaTypes: any[] = ['None', 'H1B', 'L1', 'Australia', 'Others'];
  public selectedDesignation: string = '';
  public selectedDomain: string = '';
  public selectedVisaType: string = '';
  private imageInfo: any;
  private fileSize: number = 0;
  public setDobDate: string;
  public setDojDate: string;
  public successMsg: boolean = false;
  public uniqueEmailError: boolean = false;
  public uniquePhoneError: boolean = false;
  public fileSizeError: boolean = false;
  public serverError: boolean = false;
  public uploadedFiles: Array<any> = [];
  public uploadError: boolean = false;
  public uploadFieldName = 'avatar';
  public message: string = "";
  public modalType: string = "success";
  public title: string = 'Register';
  public buttonText: string = 'Save';

  constructor(private _fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        private commonService: CommonService,
        private _fileUpload: FileUploadService,
        private helperService: HelperService,
        private validationService: ValidationService) { }

  ngOnInit() {
    this.getParamId();

    this.userInfo = this.commonService.getUserCookies();

    if(!this.userId) {
      this.checkIfLoggedIn();
    }

    this.buildUserForm();
  }

  //method to fetch user id from url
  getParamId() {
    this.route.params.subscribe(
      (params : Params) => {
        this.userId = params["id"];
      }
    );
  }

  //if user is logged in already and tries to register then navigate to home page
  checkIfLoggedIn() {
    if(this.userInfo) {
      this.router.navigate(['/']);
    }
  }

  //method to create user form - reactive way
  buildUserForm(): void {
    //initialize our form
    this.userForm = this._fb.group({
      name: ['', [
          Validators.required,
          Validators.minLength(2)
        ]
      ],
      email: ['', [
          Validators.required
        ]
      ],
      credentials: this._fb.group({
        password: this.getPwdStructure(),
        confirmPassword: this.getPwdStructure()
      }, { validator: this.helperService.pwdMatcher }),
      phone: ['', [
          Validators.required,
          Validators.pattern(this.validationService.getPhonePattern())
        ]
      ],
      designation: ['', [Validators.required]],
      domain: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      doj: ['', [Validators.required]],
      skills: ['', [Validators.required]],
      visa: ['', [Validators.required]],
      about: ['', [Validators.required]],
      avatar: [''],
      role: ['user', '']
    });

    //pre fill the values for editing form
    if(this.userId) {
      //set page title and button text if user is editing profile
      this.title = 'Edit Profile';
      this.buttonText = 'Update';

      //prefill the form
      let userObj = this.formatUser(this.userInfo);
      this.selectedDesignation = userObj.designation;
      this.selectedDomain = userObj.domain;
      this.selectedVisaType = userObj.visa;
      this.setDobDate = this.helperService.getFormattedDate(userObj.dob);
      this.setDojDate = this.helperService.getFormattedDate(userObj.doj);

      (<FormGroup>this.userForm)
            .setValue(userObj, { onlySelf: true });
    }

  }

  //method to handle form submission
  onSubmit(isValid: boolean) {
    this.submitted = true;
    this.uniqueEmailError = false;
    this.uniquePhoneError = false;
    this.fileSizeError = false;
    this.serverError = false;
    this.uploadError = false;

    if(this.fileSize && this.fileSize > 3145728) {
      this.fileSizeError = true;
      return;
    }

    if(isValid) {
      const userEmail = this.userForm.get('email').value
      const deloitteEmail = userEmail.indexOf('@') !== -1 ? userEmail.substring(0, userEmail.indexOf('@')) : userEmail
      this.user = {...this.userForm.value, email: `${deloitteEmail}@deloitte.com`};
      this.loading = true;
      if(!this.userId) {
        this.message = "Registered Successfully";

        //if user id not present then call to add user method
        this.userService.create(this.user)
        .subscribe(
          data => {
            if(this.imageInfo) {
              let headers: Headers;
              let token = data.headers.get('x-auth');
              this.saveImage(this.imageInfo, token);
            } else {
              this.successMsg = true;
              this.loading = false;
              setTimeout(() => {
                this.commonService.notifyHeader();
                this.successMsg = false;
                this.router.navigate(['/login']);
              }, 3000);
            }
          },
          error => {
              this.loading = false;
              this.setError(error);
          });
      } else {
        this.message = "User updated successfully";

        //if user id present then call to edit user method
        this.userService.update(this.userId, this.user, 'self')
        .subscribe(
          data => {
            if(this.imageInfo) {
              this.saveImage(this.imageInfo);
            } else {
              this.successMsg = true;
              this.loading = false;
              setTimeout(() => {
                this.commonService.notifyHeader();
                this.successMsg = false;
                this.router.navigate(['/home']);
              }, 3000);
            }
          },
          error => {
              this.loading = false;
              this.setError(error);
          });
      }
    }

  }

  //capture uploaded file (profile pic)
  profilePicChange(fieldName: string, fileList: FileList) {
    this.fileSizeError = false;
    // handle file changes
    this.imageInfo = new FormData();
    this.fileSize = fileList[0].size;

    if (!fileList.length) return;

    // append the files to FormData
    Array
      .from(Array(fileList.length).keys())
      .map(x => {
        this.imageInfo.append(fieldName, fileList[x], fileList[x].name);
      });
  }

  //save uploaded file (profile pic)
  saveImage(data, userToken = null) {
    this._fileUpload.upload(data, userToken)
      .take(1)
      .subscribe(x => {
        this.successMsg = true;
        this.loading = false;
        setTimeout(() => {
          this.commonService.notifyHeader();
          this.successMsg = false;
          if(userToken) {
            this.router.navigate(['/login']);
          } else {
            this.router.navigate(['/home']);
          }
        }, 3000);
      }, err => {
        this.uploadError = true;
        setTimeout(() => {
          this.commonService.notifyHeader();
          this.successMsg = false;
          if(userToken) {
            this.router.navigate(['/login']);
          } else {
            this.router.navigate(['/home']);
          }
        }, 3000);
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
      domain: user.domain,
      dob: user.dob,
      doj: user.doj,
      skills: user.skills,
      visa: user.visa,
      about: user.about,
      avatar: user.avatar || '',
      role: user.role
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

  //method to set error messages
  setError(error) {
    if(error.status === 400) {
      if(error._body.trim() === 'email') {
        this.uniqueEmailError = true;
      } else if(error._body.trim() === 'phone') {
        this.uniquePhoneError = true;
      }
    } else if(error.status === 500) {
      this.serverError = true;
    }
  }

}
