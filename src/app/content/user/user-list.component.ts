import { Component, OnInit } from '@angular/core';

import { UserService, CommonService } from '../../_services';
import { User } from '../../_interfaces';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})

export class UserListComponent implements OnInit {
  public currentUser: User;
  public users: User[] = [];
  public message: string = '';
  public modalType: string = "confirm";
  public showModal: boolean = false;
  public isConfirmed: boolean = false;
  private userObj: any;
  private userId: number;
  public showSnapshot: boolean = true;

  constructor(
      private userService: UserService,
      private router: Router,
      private commonService: CommonService) {
    this.currentUser = this.commonService.getUserCookies();
    if(!this.currentUser){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.getCurrentUrl();
    this.getAllUsers();
  }

  //method to get current route from the url
  getCurrentUrl() {
    this.showSnapshot = (location.href.indexOf('users') !== -1) ? false : true;
  }

  //method to confirm users action (delete)
  confirmAction(event) {
    this.isConfirmed = event;
    if(event) {
      this.userService.update(this.userId, this.userObj, 'other').subscribe(() => { this.getAllUsers() });
    }
    this.showModal = false;
  }

  //method to update users status
  changeStatus(id: number, status: string) {
    this.message = "Are you sure you want to change status?";
    this.userObj = {
      status: status
    }
    this.userId = id;
    this.showModal = true;
  }

  //method to update users role
  changeRole(id: number, role: string) {
    this.message = "Are you sure you want to change role?";
    this.userObj = {
      role: role
    }
    this.userId = id;
    this.showModal = true;
  }

  //method to get user list
  private getAllUsers() {
    this.userService.getAll()
      .subscribe(
        users => { 
          this.users = users;
          console.log("users are",this.users);
        });
  }
  private sendUserId(id) {
    console.log("id is ",id);
  }
  

}
