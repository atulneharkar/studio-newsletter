import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Headers } from '@angular/http';

import { ProjectService, CommonService, HelperService } from '../../_services';
import { Project } from '../../_interfaces';

@Component({
  selector: 'app-internal-project',
  templateUrl: './internal-project.component.html'
})

export class InternalProjectComponent implements OnInit {

  public projectForm: FormGroup;
	public submitted: boolean = false;
  private project: any;
  public loading = false;
  public projectId: number;
  public projectInfo: Project;
  public technologies: any[] = ['Oracle', 'Node JS', 'Angular', 'React'];
  public contactPersons: any[] = ['Karan', 'Tanvi'];
  public projectTypes: any[] = ['FI', 'RFP', 'POC'];
  public domains: any[] = ['UX', 'VD', 'FE', 'BA'];
  public selectedDesignation: string = '';
  public selectedContactPersons: string = '';
  public selectedProjectTypes: string = '';
  public successMsg: boolean = false;
  public serverError: boolean = false;
  public message: string = "";
  public modalType: string = "success";

  constructor(private _fb: FormBuilder, 
        private router: Router,
        private route: ActivatedRoute,
        private userService: ProjectService,
        private commonService: CommonService,
        private helperService: HelperService) { }

  ngOnInit() {
    this.getParamId();

    this.projectInfo = this.commonService.getUserCookies();

    this.buildProjectForm();
  }

  //method to fetch project id from url
  getParamId() {
    this.route.params.subscribe(
      (params : Params) => {
        this.projectId = params["id"];
      }
    );
  }

  //method to create project form - reactive way
  buildProjectForm(): void {
    //initialize our form 
    this.projectForm = this._fb.group({
      name: ['', [
          Validators.required, 
          //Validators.minLength(2),
          //Validators.pattern(/^[a-zA-Z]*$/)
        ]
      ],
      description: ['', [
          Validators.required,
          //Validators.minLength(2),
          //Validators.pattern(/^[a-zA-Z]*$/)
        ]
      ],
      estimation: ['', [
          Validators.required,
          //Validators.pattern(/^[a-zA-Z]*$/)
        ]
      ],
      vacancies: this._fb.group({
        domain: ['', [Validators.required]],
        count: ['', [Validators.required]]
      }),
      members: ['', [
          Validators.required,
          //Validators.pattern(/^[a-zA-Z]*$/)
        ]
      ],
      contactPerson: ['', [Validators.required]],
      technology: ['', [Validators.required]],
      projectType: ['', [Validators.required]]
    });

    //pre fill the values for editing form
    if(this.projectId) {
      //prefill the form 
    //   this.selectedDesignation = userObj.designation;

    //   (<FormGroup>this.projectForm)
    //         .setValue(userObj, { onlySelf: true });
     }

  }

  //method to handle form submission
  onSubmit(isValid: boolean) {
    this.submitted = true;
    this.serverError = false;

    this.project = this.projectForm.value;
    if(isValid) {
      this.loading = true;
      if(!this.projectId) {
        this.message = "Project added successfully";

        //if project id not present then call to add project method
      // this.projectService.create(this.project)
      // .subscribe(
      //   data => {
      //     this.successMsg = true;
      //     setTimeout(() => {
      //       this.loading = false;
      //       this.commonService.notifyHeader();
      //       this.successMsg = false;
      //       this.router.navigate(['/login']);
      //     }, 3000);
      //   },
      //   error => {
      //       this.loading = false;
      //       this.serverError = true;
      //   });
      } else {
        this.message = "Project edited successfully";

        //if project id present then call to edit project method
      // this.projectService.update(this.projectId, this.project)
      // .subscribe(
      //   data => {
      //     this.successMsg = true;
      //     setTimeout(() => {
      //       this.commonService.notifyHeader();
      //       this.successMsg = false;
      //       this.router.navigate(['/home']);
      //     }, 3000);
      //   },
      //   error => {
      //       this.loading = false;
      //       this.serverError = true;
      //   });
      }
    }

  }

}
