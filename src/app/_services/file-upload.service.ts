import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { CommonService } from '../_services';

@Injectable()
export class FileUploadService {

  constructor(
      private http: Http,
      private commonService: CommonService) { }

  upload(formData) {
    const url = `${this.commonService.getDomainUrl()}/user/avatar`;
    return this.http.post(url, formData, this.commonService.getJwt()).map((response: Response) => this.commonService.setUserCookies(response, ''));
  }
}