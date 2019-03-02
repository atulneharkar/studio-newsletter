import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { CommonService } from '../_services';

@Injectable()
export class FileUploadService {

  constructor(private http: Http,
      private commonService: CommonService) { }

  //method to upload users profile picture (avatar)
  upload(formData, token) {
    const url = `${this.commonService.getDomainUrl()}/user/avatar`;
    return this.http.post(url, formData, this.commonService.getJwt(token)).map((response: Response) => 
    	(token) ? '' : this.commonService.setUserCookies(response, ''));
  }

  //method to upload event image (avatar)
  uploadEventImage(formData, token, ids) {
    // const url = `${this.commonService.getDomainUrl()}/event/pic/5c4af91a3fabd200042d6233`;
    const url = `${this.commonService.getDomainUrl()}/event/pic/${ids}`;
    return this.http.post(url, formData, this.commonService.getJwt(token)).map((response: Response) => 
    	(token) ? '' : this.commonService.setUserCookies(response, ''));
  }
}