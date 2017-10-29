import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Headers } from '@angular/http';

import { CommonService, HelperService, EventService, UserService } from '../../_services';
import { Event, User } from '../../_interfaces';

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
  public selectedOrganiser: string = '';
  public setFromDate: string = '';
  public setToDate: string = '';
  public setFromTime: string = '';
  public setToTime: string = '';
  public successMsg: boolean = false;
  public serverError: boolean = false;
  public userId: number;
  public slotsArr: Array<{}> = [];
  public message: string = "";
  public modalType: string = "success";
  public title: string = 'Create Event';
  public buttonText: string = 'Save';
  public source: string = "";
  public users: User[] = [];

  constructor(private _fb: FormBuilder, 
        private router: Router,
        private route: ActivatedRoute,
        private commonService: CommonService,
        private helperService: HelperService,
        private eventService: EventService,
        private userService: UserService) {
  }

  ngOnInit() {
    this.getParamId();
    this.getAllUsers();
    this.buildEventForm();

    this.userId = (this.commonService.getUserCookies())._id;
  }

  //method to fetch meeting id from url
  getParamId() {
    this.route.params.subscribe(
      (params : Params) => {
        this.eventId = params["id"];
        if(this.eventId) {
          this.getEventInfo(this.eventId);
        }
      }
    );
  }

  //get meeting information from database based on meeting id
  getEventInfo(id: number) {
    this.eventService.getById(id)
      .subscribe(
        data => {
          this.eventInfo = data;
          this.buildEventForm();
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

  //method to create meeting form - reactive way
  buildEventForm(): void {
    //initialize our form 
    this.eventForm = this._fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      location: ['', [Validators.required]],
      slots: this._fb.group({
        fromDate: ['', [Validators.required]],
        toDate: ['', []],
        fromTime: ['', [Validators.required]],
        toTime: ['', [Validators.required]],
      }, { validator: this.helperService.dateTimeCompare }),
      organiser: ['', []],
    });

    //pre fill the values for editing form

    if(this.eventInfo) {
      //set page title and button text if user is editing meeting
      this.title = 'Edit Event';
      this.buttonText = 'Update';

      //prefill the form 
      let eventObj = this.formatEvent(this.eventInfo[0]);
      this.selectedOrganiser = eventObj.organiser;
      this.setFromDate = this.helperService.getFormattedDate(eventObj.slots.fromDate);
      if(eventObj.slots.toDate) {
        this.setToDate = this.helperService.getFormattedDate(eventObj.slots.toDate);
      }

      this.setFromTime = this.helperService.getFormattedTime(eventObj.slots.fromTime);
      this.setToTime = this.helperService.getFormattedTime(eventObj.slots.toTime);

      (<FormGroup>this.eventForm)
            .setValue(eventObj, { onlySelf: true });
    }

  }

  //method to handle form submission
  onSubmit(isValid: boolean) {
    this.submitted = true;
    this.serverError = false;
    this.event = this.eventForm.value;
    this.slotsArr = [];

    if(isValid) {
      this.slotsArr.push(this.event.slots);
      this.event.slots = this.slotsArr;
      this.loading = true;
      if(!this.eventId) {
        this.message = "Event created successfully";

        //if event id not present then call to add event method
        this.eventService.create(this.event)
        .subscribe(
          data => {
            this.successMsg = true;
            setTimeout(() => {
              this.loading = false;
              this.successMsg = false;
              this.router.navigate(['/events']);
            }, 3000);
          },
          error => {
            this.loading = false;
            this.setError(error);
          });
      } else {
        this.message = "Event edited successfully";

        //if event id present then call to edit event method
        this.eventService.update(this.eventId, this.event)
        .subscribe(
          data => {
            this.successMsg = true;
            setTimeout(() => {
              this.successMsg = false;
              this.router.navigate(['/events']);
            }, 3000);
          },
          error => {
            this.loading = false;
            this.setError(error);
          });
      }
    }

  }

  //format meeting object
  formatEvent(event) {
    return {
      title: event.title,
      description: event.description,
      location: event.location,
      slots: {
        fromDate: event.slots[0].fromDate,
        toDate: event.slots[0].toDate,
        fromTime: event.slots[0].fromTime,
        toTime: event.slots[0].toTime
      },
      organiser: event.organiser._id
    };
  }

  //method to set error messages
  setError(error) {
    if(error.status === 500) {
      this.serverError = true;
    }
  }

}

