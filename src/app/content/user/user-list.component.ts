import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { UserService } from '../../_services';
import { User } from '../../_interfaces';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})

export class UserListComponent implements OnInit {
  currentUser: User;
  users: User[] = [];

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(Cookie.get('userInfo'));
  }

  ngOnInit() {
    this.getAllUsers();
  }

  changeStatus(id: number, status: string) {
    let user = {
      status: status
    }
    this.userService.update(id, user).subscribe(() => { this.getAllUsers() });
  }

  changeRole(id: number, role: string) {
    let user = {
      role: role
    }
    this.userService.update(id, user).subscribe(() => { this.getAllUsers() });
  }

  private getAllUsers() {
    this.userService.getAll()
      .subscribe(
        users => { 
          this.users = users;
        });
  }

}
