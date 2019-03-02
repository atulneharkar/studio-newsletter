import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Headers } from '@angular/http';
import { AbstractControl } from '@angular/forms';

import { ProjectService, CommonService, HelperService, UserService } from '../../_services';
import { Project, User } from '../../_interfaces';

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
  public projectInfo: Project = null;
  public technologies: any[] = ['Oracle', 'Node JS', 'Angular', 'React'];
  public projectTypes: any[] = ['FI', 'RFP', 'POC'];
  public domains: any[] = ['UX', 'VD', 'FE', 'BA'];
  // public domains: any[] = ['All', 'UX', 'VD', 'QA', 'FE','FX', 'BxD','EM', 'iOS', 'Android'];
  public selectedContactPerson: string = '';
  public selectedProjectType: string = '';
  public successMsg: boolean = false;
  public serverError: boolean = false;
  public message: string = "";
  public modalType: string = "success";
  public title: string = 'Add Project';
  public buttonText: string = 'Save';
  public users: User[] = [];
  public userId: number;

  constructor(private _fb: FormBuilder, 
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        private projectService: ProjectService,
        private commonService: CommonService,
        private helperService: HelperService) { }

  ngOnInit() {
    this.getParamId();
    this.getAllUsers();

    this.userId = (this.commonService.getUserCookies())._id;

    this.buildProjectForm();
  }

  //method to fetch project id from url
  getParamId() {
    this.route.params.subscribe(
      (params : Params) => {
        this.projectId = params["id"];
        if(this.projectId) {
          this.getProjectInfo(this.projectId);
        }
      }
    );
  }

  //get project information from database based on project id
  getProjectInfo(id: number) {
    this.projectService.getById(id)
      .subscribe(
        data => {
          this.projectInfo = data;
          this.buildProjectForm();
        },
        error => {
        });
  }

  //method to get user list
  getAllUsers() {
    this.userService.getAll()
      .subscribe(
        users => { 
          this.users = users;
        });
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
      vacancies: this.getStructure('createVacancies'),
      members: this.getStructure('createMembers'),
      contactPerson: ['', [Validators.required]],
      technologies: this.getStructure('createTechnology'),
      projectType: ['', [Validators.required]]
    });

    //pre fill the values for editing form
    if(this.projectInfo) {
      //set page title and button text if user is editing project
      this.title = 'Edit Project';
      this.buttonText = 'Update';

      //prefill the form 
      let projectObj = this.formatProject(this.projectInfo[0]);
      this.selectedContactPerson = projectObj.contactPerson;
      this.selectedProjectType = projectObj.projectType;

      this.patchValues(projectObj.vacancies, 'vacancies');
      this.patchValues(projectObj.technologies, 'technologies');
      this.patchValues(projectObj.members, 'members');

      (<FormGroup>this.projectForm)
            .setValue(projectObj, { onlySelf: true });
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
        this.projectService.create(this.project)
        .subscribe(
          data => {
            this.successMsg = true;
            setTimeout(() => {
              this.loading = false;
              this.successMsg = false;
              this.router.navigate(['/internal-project']);
            }, 3000);
          },
          error => {
              this.loading = false;
              this.setError(error);
          });
      } else {
        this.message = "Project edited successfully";
        //if project id present then call to edit project method
        this.projectService.update(this.projectId, this.project)
        .subscribe(
          data => {
            this.successMsg = true;
            setTimeout(() => {
              this.loading = false;
              this.successMsg = false;
              this.router.navigate(['/internal-project']);
            }, 3000);
          },
          error => {
              this.loading = false;
              this.setError(error);
          });
      }
    }

  }

  getStructure(fieldName) {
    if(!this.projectId) {
      return this._fb.array([ this[fieldName]() ], this.helperService.checkDuplicate(fieldName));
    } else {
      return this._fb.array([  ], this.helperService.checkDuplicate(fieldName));
    }
  }

  patchValues(data, fieldName) {
    const control = <FormArray>this.projectForm.controls[fieldName];
    data.forEach(values => {
      control.push(this.patchValue(values))
    })
  }

  patchValue(values) {
    let obj = {};
    for (var key in values) {
      obj[key] = values[key];
    }
    return this._fb.group(obj)    
  }

  createVacancies(): FormGroup {
    return this._fb.group({
      domain: ['', [Validators.required]],
      count: ['', [Validators.required]]
    });
  }

  addVacancy() {
    const control = <FormArray>this.projectForm.controls['vacancies'];
    control.push(this.createVacancies());
  }

  removeVacancy(index: number) {
    const control = <FormArray>this.projectForm.controls['vacancies'];
    control.removeAt(index);
  }

  createMembers(): FormGroup {
    return this._fb.group({
      member: ['', [Validators.required]]
    });
  }

  addMember() {
    const control = <FormArray>this.projectForm.controls['members'];
    control.push(this.createMembers());
  }

  removeMember(index: number) {
    const control = <FormArray>this.projectForm.controls['members'];
    control.removeAt(index);
  }

  createTechnology(): FormGroup {
    return this._fb.group({
      technology: ['', [Validators.required]]
    });
  }

  addTechnology() {
    const control = <FormArray>this.projectForm.controls['technologies'];
    control.push(this.createTechnology());
  }

  removeTechnology(index: number) {
    const control = <FormArray>this.projectForm.controls['technologies'];
    control.removeAt(index);
  }

  //format project object
  formatProject(project) {
    return {
      name: project.name,
      description: project.description,
      estimation: project.estimation,
      vacancies: project.vacancies,
      members: project.members,
      technologies: project.technologies,
      projectType: project.projectType,
      contactPerson: project.contactPerson._id
    };
  }

  //method to set error messages
  setError(error) {
    if(error.status === 500) {
      this.serverError = true;
    }
  }


}
