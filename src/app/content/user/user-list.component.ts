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
  public uxUsers: User[] = []; // UX
  public njUsers: User[] = []; // New joinees
  public vdUsers: User[] = []; // VD
  public qaUsers: User[] = []; // QA
  public fedUsers: User[] = []; // FE
  public fxUsers: User[] = []; // FX
  public bxdUsers : User[] = []; // BxD
  public emUsers: User[] = []; // EM
  public iosUsers: User[] = []; // iOS
  public androidUsers: User[] = []; // Android
  public message: string = '';
  public modalType: string = "confirm";
  public showModal: boolean = false;
  public isConfirmed: boolean = false;
  public showTextBox: boolean = false;
  private userObj: any;
  private userId: number;
  public showSnapshot: boolean = true;
  public queryString: string = '';

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

  toggleSearchBar(){
    this.showTextBox = !this.showTextBox;
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
          this.uxUsers = this.users.filter(function(item){
            return item.domain === 'UX';
          });
          this.njUsers = this.users.filter(function(item){
            // console.log("item",item.doj.slice(0,10) + 30 days >= todaysdate);
            var curDate = new Date(Date.parse(item.doj));
            var newDate = curDate;
            newDate.setDate(curDate.getDate()+30);
            //console.log("newDate",newDate);
            return newDate >= new Date();
          });
          this.vdUsers = this.users.filter(function(item){
            return item.domain === 'VD';
          })
          this.qaUsers = this.users.filter(function(item){
            return item.domain === 'QA';
          });
          this.fedUsers = this.users.filter(function(item){
            return item.domain === 'FE';
          });
          this.fxUsers = this.users.filter(function(item){
            return item.domain === 'FX';
          });
          this.uxUsers = this.users.filter(function(item){
            return item.domain === 'UX';
          });
          this.bxdUsers = this.users.filter(function(item){
            return item.domain === 'BxD';
          });
          this.emUsers = this.users.filter(function(item){
            return item.domain === 'EM';
          });
          this.iosUsers = this.users.filter(function(item){
            return item.domain === 'iOS';
          });
          this.androidUsers = this.users.filter(function(item){
            return item.domain === 'Android';
          });
        });
  }
  private sendUserId(id) {
    console.log("user id is ",id);
    this.router.navigate(['users/view', id]);
  }
  

}
