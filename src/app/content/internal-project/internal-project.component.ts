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
  private project;
  loading = false;
  projectId: number;
  projectInfo: Project;
  public technologies: any[] = ['Oracle', 'Node JS', 'Angular', 'React'];
  public contactPersons: any[] = ['Karan', 'Tanvi'];
  public projectTypes: any[] = ['FI', 'RFP', 'POC'];
  public domains: any[] = ['UX', 'VD', 'FE', 'BA'];
  selectedDesignation: string = '';
  selectedContactPersons: string = '';
  selectedProjectTypes: string = '';
  successMsg: boolean = false;
  serverError: boolean = false;

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

  getParamId() {
    this.route.params.subscribe(
      (params : Params) => {
        this.projectId = params["id"];
      }
    );
  }

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

    if(this.projectId) {
      //prefill the form 
    //   this.selectedDesignation = userObj.designation;

    //   (<FormGroup>this.projectForm)
    //         .setValue(userObj, { onlySelf: true });
     }

  }

  onSubmit(isValid: boolean) {
    this.submitted = true;
    this.serverError = false;

    this.project = this.projectForm.value;
    if(isValid) {
      this.loading = true;
      if(!this.projectId) {
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
