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
  private meeting: any;
  public loading = false;
  public meetingId: number;
  public meetingInfo: MeetingRoom;
  public selectedLocation: string = '';
  public setFromDate: string = '';
  public setToDate: string = '';
  public setFromTime: string = '';
  public setToTime: string = '';
  public successMsg: boolean = false;
  public roomAlreadyBookedError: boolean = false;
  public serverError: boolean = false;
  public userId: number;
  public slotsArr: Array<{}> = [];
  public message: string = "";
  public modalType: string = "success";
  public title: string = 'Book Meeting';
  public buttonText: string = 'Save';
  public source: string = "";
  public roomList: Array<{}> = [];
  public slotBookedDetails: Array<{}> = [];

  constructor(private _fb: FormBuilder, 
        private router: Router,
        private route: ActivatedRoute,
        private commonService: CommonService,
        private helperService: HelperService,
        private meetingRoomService: MeetingRoomService) {
  }

  ngOnInit() {
    this.getParamId();
    this.getAllRoom();
    this.buildMeetingForm();

    this.userId = (this.commonService.getUserCookies())._id;
  }

  //method to fetch meeting id from url
  getParamId() {
    this.route.params.subscribe(
      (params : Params) => {
        this.meetingId = params["id"];
        this.source = params["source"];
        if(this.meetingId) {
          this.getMeetingInfo(this.meetingId);
        }
      }
    );
  }

  //get meeting information from database based on meeting id
  getMeetingInfo(id: number) {
    this.meetingRoomService.getById(id)
      .subscribe(
        data => {
          this.meetingInfo = data;
          this.buildMeetingForm();
        },
        error => {
        });
  }

  //get meeting information from database based on meeting id
  getAllRoom() {
    this.meetingRoomService.getAllRoom()
      .subscribe(
        data => {
          this.roomList = data;
        },
        error => {
        });
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

    if(this.meetingInfo) {
      //set page title and button text if user is editing meeting
      this.title = 'Edit Meeting';
      this.buttonText = 'Update';

      //prefill the form 
      let meetingObj = this.formatMeeting(this.meetingInfo[0]);
      this.selectedLocation = meetingObj.location;
      this.setFromDate = this.helperService.getFormattedDate(meetingObj.slots.fromDate);
      if(meetingObj.slots.toDate) {
        this.setToDate = this.helperService.getFormattedDate(meetingObj.slots.toDate);
      }

      this.setFromTime = this.helperService.getFormattedTime(meetingObj.slots.fromTime);
      this.setToTime = this.helperService.getFormattedTime(meetingObj.slots.toTime);

      (<FormGroup>this.meetingForm)
            .setValue(meetingObj, { onlySelf: true });
    }

  }

  //method to handle form submission
  onSubmit(isValid: boolean) {
    this.submitted = true;
    this.roomAlreadyBookedError = false;
    this.serverError = false;
    this.meeting = this.meetingForm.value;
    this.slotsArr = [];

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
              this.successMsg = false;
              if(this.source === 'meeting') {
                this.router.navigate(['/meeting']);
              } else {
                this.router.navigate(['/login']);
              }
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

  //format meeting object
  formatMeeting(meeting) {
    return {
      title: meeting.title,
      description: meeting.description,
      location: meeting.location._id,
      slots: {
        fromDate: meeting.slots[0].fromDate,
        toDate: meeting.slots[0].toDate,
        fromTime: meeting.slots[0].fromTime,
        toTime: meeting.slots[0].toTime
      },
      bookBy: meeting.bookBy._id
    };
  }

  //method to set error messages
  setError(error) {
    const body = JSON.parse(error['_body']);
    if(body && body.alreadyBookedSlots) {
      this.roomAlreadyBookedError = true;
      this.slotBookedDetails = body.alreadyBookedSlots;
    } else if(error.status === 500) {
      this.serverError = true;
    }
  }

}
