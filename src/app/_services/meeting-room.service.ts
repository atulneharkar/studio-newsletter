import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { MeetingRoom } from '../_interfaces';
import { CommonService } from '../_services';

@Injectable()
export class MeetingRoomService {

  constructor(
  	  private http: Http,
      private commonService: CommonService) { }

  //method to create new meeting
  create(meeting: MeetingRoom) {
    return this.http.post(`${this.commonService.getDomainUrl()}/book-room/new`, meeting, this.commonService.getJwt()).map((response: Response) => response);
  }

  //method to get list of all meetings
  getAll() {
    return this.http.get(`${this.commonService.getDomainUrl()}/book-room/all`, this.commonService.getJwt()).map((response: Response) => response.json());
  }

  //method to get meeting by id
  getById(id: number) {
    return this.http.get(`${this.commonService.getDomainUrl()}/book-room/${id}`, this.commonService.getJwt()).map((response: Response) => response.json());
  }

  //method to update meeting
  update(id: number, meeting: object) {
    return this.http.put(`${this.commonService.getDomainUrl()}/book-room/${id}`, meeting, this.commonService.getJwt()).map((response: Response) => response);
  }

  //method to delete meeting
  delete(id: number) {
    return this.http.delete(`${this.commonService.getDomainUrl()}/book-room/${id}`, this.commonService.getJwt()).map((response: Response) => response);
  }

  //method to get list of all meeting rooms
  getAllRoom() {
    return this.http.get(`${this.commonService.getDomainUrl()}/room/all`, this.commonService.getJwt()).map((response: Response) => response.json());
  }

}
