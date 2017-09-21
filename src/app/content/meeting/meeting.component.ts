import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Headers } from '@angular/http';

import { CommonService, HelperService } from '../../_services';
import { BookingRoom } from '../../_interfaces';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html'
})

export class MeetingComponent implements OnInit {

  public meetingForm: FormGroup;
	public submitted: boolean = false;
  private meeting;
  loading = false;
  meetingId: number;
  meetingInfo: BookingRoom;
  public locations: any[] = ['Colaba', 'Church gate'];
  selectedLocation: string = '';
  setFromDate;
  setToDate;
  setFromTime;
  setToTime;
  successMsg: boolean = false;
  roomAlreadyBookedError: boolean = false;
  serverError: boolean = false;

  constructor(private _fb: FormBuilder, 
        private router: Router,
        private route: ActivatedRoute,
        private commonService: CommonService,
        private helperService: HelperService) { }

  ngOnInit() {
    this.getParamId();
    this.buildMeetingForm();
  }

  getParamId() {
    this.route.params.subscribe(
      (params : Params) => {
        this.meetingId = params["id"];
      }
    );
  }

  buildMeetingForm(): void {
    //initialize our form 
    this.meetingForm = this._fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      location: ['', [Validators.required]],
      slots: this._fb.group({
        fromDate: ['', [Validators.required]],
        toDate: ['', [Validators.required]],
        fromTime: ['', [Validators.required]],
        toTime: ['', [Validators.required]],
      }, { validator: this.helperService.dateCompare })
    });

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

  onSubmit(isValid: boolean) {
    this.submitted = true;
    this.roomAlreadyBookedError = false;
    this.serverError = false;

    this.meeting = this.meetingForm.value;
    if(isValid) {
      this.loading = true;
    }

  }

}
