import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { Project } from '../_interfaces';
import { CommonService } from '../_services';

@Injectable()
export class ProjectService {

  constructor(
  	  private http: Http,
      private commonService: CommonService) { }

  //method to create new meeting
  create(project: Project) {
    return this.http.post(`${this.commonService.getDomainUrl()}/work/new`, project, this.commonService.getJwt()).map((response: Response) => response);
  }

  //method to get list of all projects
  getAll() {
    return this.http.get(`${this.commonService.getDomainUrl()}/work/all/all`, this.commonService.getJwt()).map((response: Response) => response.json());
  }

  //method to get meeting by id
  getById(id: number) {
    return this.http.get(`${this.commonService.getDomainUrl()}/work/all/${id}`, this.commonService.getJwt()).map((response: Response) => response.json());
  }

  //method to update meeting
  update(id: number, project: object) {
    return this.http.put(`${this.commonService.getDomainUrl()}/work/${id}`, project, this.commonService.getJwt()).map((response: Response) => response);
  }

  //method to delete meeting
  delete(id: number) {
    return this.http.delete(`${this.commonService.getDomainUrl()}/work/${id}`, this.commonService.getJwt()).map((response: Response) => response);
  }

}
