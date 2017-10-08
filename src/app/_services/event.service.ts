import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { Event } from '../_interfaces';
import { CommonService } from '../_services';

@Injectable()
export class EventService {

  constructor(
  	  private http: Http,
      private commonService: CommonService) { }

  //method to create new meeting
  create(event: Event) {
    return this.http.post(`${this.commonService.getDomainUrl()}/event/new`, event, this.commonService.getJwt()).map((response: Response) => response);
  }

  //method to get list of all meetings
  getAll() {
    return this.http.get(`${this.commonService.getDomainUrl()}/event/all`, this.commonService.getJwt()).map((response: Response) => response.json());
  }

  //method to get meeting by id
  getById(id: number) {
    return this.http.get(`${this.commonService.getDomainUrl()}/event/${id}`, this.commonService.getJwt()).map((response: Response) => response.json());
  }

  //method to update meeting
  update(id: number, event: object) {
    return this.http.put(`${this.commonService.getDomainUrl()}/event/${id}`, event, this.commonService.getJwt()).map((response: Response) => response);
  }

  //method to delete meeting
  delete(id: number) {
    return this.http.delete(`${this.commonService.getDomainUrl()}/event/${id}`, this.commonService.getJwt()).map((response: Response) => response);
  }

}
