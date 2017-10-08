import { Component, OnInit } from '@angular/core';

import { MeetingRoomService, CommonService } from '../../_services';
import { MeetingRoom } from '../../_interfaces';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html'
})
export class MeetingListComponent implements OnInit {

  public meetings: MeetingRoom[] = [];
  public message: string = '';
  public modalType: string = "confirm";
  public showModal: boolean = false;
  public isConfirmed: boolean = false;
  public meetingId: number;
  public showSnapshot: boolean = true;

  constructor(
      private meetingRoomService: MeetingRoomService,
      private commonService: CommonService) {
  }

  ngOnInit() {
    this.getCurrentUrl();
    this.getAllMeetings();
  }

  //method to get current route from the url
  getCurrentUrl() {
    this.showSnapshot = (location.href.indexOf('meeting') !== -1) ? false : true;
  }

  //method to confirm users action (delete)
  confirmAction(event) {
    this.isConfirmed = event;
    if(event) {
      this.meetingRoomService.delete(this.meetingId).subscribe(() => { this.getAllMeetings() });
    }
    this.showModal = false;
  }

  //method to delete meeting
  deleteMeeting(id: number) {
    this.message = "Are you sure you want to delete meeting?";
    this.meetingId = id;
    this.showModal = true;
  }

  //method to get meeting list
  private getAllMeetings() {
    this.meetingRoomService.getAll()
      .subscribe(
        meetings => { 
          this.meetings = meetings;
        });
  }

}
