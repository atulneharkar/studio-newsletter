import { Component, OnInit } from '@angular/core';

import { EventService, CommonService, UserService, HelperService } from '../../_services';
import { User } from '../../_interfaces';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'studio-folks-profile',
  templateUrl: './studio-folks-profile.component.html'
})
export class StudioFolksProfileComponent implements OnInit {

  public userId: number;
  public dojoining: String;
  public users: User[] = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private helperService: HelperService) {
  }

  ngOnInit() {
    console.log("studio folks profile page");
    this.getParamId();
  }

  //method to user info id from url and id
  getUserInfo(userId: number) {
    console.log("fetching user info",userId);
    this.userService.getById(userId)
      .subscribe(
        data => {
          this.users = data;
          const dojoining = this.users['doj'].slice(0,10).toString();
          const todayDate = this.helperService.getFormattedDate(new Date()).toString();
          const diffTime = Math.abs(new Date(todayDate).getTime() - new Date(dojoining).getTime());
          const diff = Math.ceil(diffTime / (1000 * 60 * 60 * 24)/365); 
          this.users['diff'] =diff;
        },
        error => {
        });
  }

   //method to fetch event id from url
  getParamId() {
    this.route.params.subscribe(
      (params : Params) => {
        this.userId = params["id"];
        if(this.userId) {
          console.log("this.userId is",this.userId);
          this.getUserInfo(this.userId);
        }
      }
    );
  }

  

  
  

}
