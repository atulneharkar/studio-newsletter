import { Component, OnInit } from '@angular/core';

import { MeetingRoomService, CommonService } from '../../_services';
import { MeetingRoom } from '../../_interfaces';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html'
})
export class MeetingListComponent implements OnInit {

  meetings: MeetingRoom[] = [];

  constructor(
      private meetingRoomService: MeetingRoomService,
      private commonService: CommonService) {
  }

  ngOnInit() {
    this.getAllMeetings();
  }

  deleteMeeting(id: number) {
    this.meetingRoomService.delete(id).subscribe(() => { this.getAllMeetings() });
  }

  private getAllMeetings() {
    this.meetingRoomService.getAll()
      .subscribe(
        meetings => { 
          this.meetings = meetings;
        });
  }

}
