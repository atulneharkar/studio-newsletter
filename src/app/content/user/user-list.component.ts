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

  constructor(
      private userService: UserService,
      private commonService: CommonService) {
    this.currentUser = this.commonService.getUserCookies();
  }

  ngOnInit() {
    this.getAllUsers();
  }

  changeStatus(id: number, status: string) {
    let user = {
      status: status
    }
    this.userService.update(id, user, 'other').subscribe(() => { this.getAllUsers() });
  }

  changeRole(id: number, role: string) {
    let user = {
      role: role
    }
    this.userService.update(id, user, 'other').subscribe(() => { this.getAllUsers() });
  }

  private getAllUsers() {
    this.userService.getAll()
      .subscribe(
        users => { 
          this.users = users;
        });
  }

}
