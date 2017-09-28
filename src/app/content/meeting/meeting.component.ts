import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Headers } from '@angular/http';

import { CommonService, HelperService, MeetingRoomService } from '../../_services';
import { MeetingRoom } from '../../_interfaces';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html'
})

export class MeetingComponent implements OnInit {

  public meetingForm: FormGroup;
	public submitted: boolean = false;
  private meeting;
  public loading = false;
  public meetingId: number;
  public meetingInfo: MeetingRoom;
  public locations: any[] = ['Colaba', 'Church gate'];
  public selectedLocation: string = '';
  public setFromDate;
  public setToDate;
  public setFromTime;
  public setToTime;
  public successMsg: boolean = false;
  public roomAlreadyBookedError: boolean = false;
  public serverError: boolean = false;
  public userId;
  public slotsArr: Array<{}> = [];
  public message: string = "";
  public modalType: string = "success";

  constructor(private _fb: FormBuilder, 
        private router: Router,
        private route: ActivatedRoute,
        private commonService: CommonService,
        private helperService: HelperService,
        private meetingRoomService: MeetingRoomService) { }

  ngOnInit() {
    this.getParamId();
    this.buildMeetingForm();

    this.userId = (this.commonService.getUserCookies())._id;
  }

  //method to fetch meeting id from url
  getParamId() {
    this.route.params.subscribe(
      (params : Params) => {
        this.meetingId = params["id"];
      }
    );
  }

  //method to create meeting form - reactive way
  buildMeetingForm(): void {
    //initialize our form 
    this.meetingForm = this._fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      location: ['', [Validators.required]],
      slots: this._fb.group({
        fromDate: ['', [Validators.required]],
        toDate: ['', []],
        fromTime: ['', [Validators.required]],
        toTime: ['', [Validators.required]],
      }, { validator: this.helperService.dateCompare }),
      bookBy: ['', []],
    });

    //pre fill the values for editing form
    // if(this.meetingId) {
    //   //prefill the form 
    //   let userObj = this.formatUser(this.userInfo);
    //   this.selectedDesignation = userObj.designation;

    //   let dob = new Date(userObj.dob);
    //   let doj = new Date(userObj.doj);
    //   this.setDobDate = dob.toISOString().substring(0, 10);
    //   this.setDojDate = doj.toISOString().substring(0, 10);

    //   (<FormGroup>this.userForm)
    //         .setValue(userObj, { onlySelf: true });
    // }

  }

  //method to handle form submission
  onSubmit(isValid: boolean) {
    this.submitted = true;
    this.roomAlreadyBookedError = false;
    this.serverError = false;
    this.meeting = this.meetingForm.value;

    if(isValid) {
      this.slotsArr.push(this.meeting.slots);
      this.meeting.slots = this.slotsArr;
      this.loading = true;
      if(!this.meetingId) {
        this.message = "Meeting created successfully";

        //if meeting id not present then call to add meeting method
        this.meetingRoomService.create(this.meeting)
        .subscribe(
          data => {
            this.successMsg = true;
            setTimeout(() => {
              this.loading = false;
              this.commonService.notifyHeader();
              this.successMsg = false;
              this.router.navigate(['/login']);
            }, 3000);
          },
          error => {
              this.loading = false;
              this.setError(error);
          });
      } else {
        this.message = "Meeting edited successfully";

        //if meeting id present then call to edit meeting method
        this.meetingRoomService.update(this.meetingId, this.meeting)
        .subscribe(
          data => {
            this.successMsg = true;
            setTimeout(() => {
              this.commonService.notifyHeader();
              this.successMsg = false;
              this.router.navigate(['/meeting']);
            }, 3000);
          },
          error => {
              this.loading = false;
              this.setError(error);
          });
      }
    }

  }

  //method to set error messages
  setError(error) {
    if(error.status === 400) {
      if(error._body.trim() === 'booked') { 
        this.roomAlreadyBookedError = true;
      }
    } else if(error.status === 500) {
      this.serverError = true;
    }
  }

}
