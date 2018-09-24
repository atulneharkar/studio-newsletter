import { Component, OnInit } from '@angular/core';

import { EventService, CommonService, UserService } from '../../_services';
import { User } from '../../_interfaces';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'studio-folks-profile',
  templateUrl: './studio-folks-profile.component.html'
})
export class StudioFolksProfileComponent implements OnInit {

  public userId: number;
  public users: User[] = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private userService: UserService) {
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
