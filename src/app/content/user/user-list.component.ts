import { Component, OnInit } from '@angular/core';

import { UserService, CommonService } from '../../_services';
import { User } from '../../_interfaces';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})

export class UserListComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  message: string = '';
  modalType: string = "confirm";
  showModal: boolean = false;
  isConfirmed: boolean = false;
  private userObj: any;
  private userId: number;

  constructor(
      private userService: UserService,
      private commonService: CommonService) {
    this.currentUser = this.commonService.getUserCookies();
  }

  ngOnInit() {
    this.getAllUsers();
  }

  countChange(event) {
    this.isConfirmed = event;
    if(event) {
      this.userService.update(this.userId, this.userObj, 'other').subscribe(() => { this.getAllUsers() });
    }
    this.showModal = false;
  }

  changeStatus(id: number, status: string) {
    this.message = "Are you sure you want to change status?";
    this.userObj = {
      status: status
    }
    this.userId = id;
    this.showModal = true;
  }

  changeRole(id: number, role: string) {
    this.message = "Are you sure you want to change role?";
    this.userObj = {
      role: role
    }
    this.userId = id;
    this.showModal = true;
  }

  private getAllUsers() {
    this.userService.getAll()
      .subscribe(
        users => { 
          this.users = users;
        });
  }

}
