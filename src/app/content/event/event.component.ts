import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Headers } from '@angular/http';

import { EventService, CommonService, HelperService } from '../../_services';
import { Event } from '../../_interfaces';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html'
})
export class EventComponent implements OnInit {

  public eventForm: FormGroup;
	public submitted: boolean = false;
  private event: any;
  public loading = false;
  public eventId: number;
  public eventInfo: Event;
  public successMsg: boolean = false;
  public serverError: boolean = false;
  public message: string = "";
  public modalType: string = "success";

  constructor(private _fb: FormBuilder, 
        private router: Router,
        private route: ActivatedRoute,
        private userService: EventService,
        private commonService: CommonService,
        private helperService: HelperService) { }

  ngOnInit() {
    this.getParamId();

    this.eventInfo = this.commonService.getUserCookies();

    this.buildEventForm();
  }

  //method to fetch event id from url
  getParamId() {
    this.route.params.subscribe(
      (params : Params) => {
        this.eventId = params["id"];
      }
    );
  }

  //method to create event form - reactive way
  buildEventForm(): void {
    //initialize our form 
    this.eventForm = this._fb.group({
      title: ['', [
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
      location: ['', [
          Validators.required,
          //Validators.pattern(/^[a-zA-Z]*$/)
        ]
      ],
      date: this._fb.group({
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]]
      }),
      time: this._fb.group({
        startTime: ['', [Validators.required]],
        endTime: ['', [Validators.required]]
      })
    });

    //pre fill the values for editing form
    if(this.eventId) {
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

    this.event = this.eventForm.value;
    if(isValid) {
      this.loading = true;

      if(!this.eventId) {
        this.message = "Event added successfully";

        //if event id not present then call to add event method
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
        this.message = "Event edited successfully";

        //if event id present then call to edit event method
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
