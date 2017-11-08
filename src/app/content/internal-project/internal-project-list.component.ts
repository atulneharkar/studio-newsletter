import { Component, OnInit } from '@angular/core';

import { ProjectService, CommonService } from '../../_services';
import { Project, User } from '../../_interfaces';

@Component({
  selector: 'app-internal-project-list',
  templateUrl: './internal-project-list.component.html'
})
export class InternalProjectListComponent implements OnInit {

  public projects: Project[] = [];
  public message: string = '';
  public modalType: string = "confirm";
  public showModal: boolean = false;
  public isConfirmed: boolean = false;
  public projectId: number;
  public currentUser: User;

  constructor(
      private projectService: ProjectService,
      private commonService: CommonService) {
  }

  ngOnInit() {
    this.getAllProjects();
    this.currentUser = this.commonService.getUserCookies();
  }

  //method to confirm users action (delete)
  confirmAction(event) {
    this.isConfirmed = event;
    if(event) {
      this.projectService.delete(this.projectId).subscribe(() => { this.getAllProjects() });
    }
    this.showModal = false;
  }

  //method to delete meeting
  deleteMeeting(id: number) {
    this.message = "Are you sure you want to delete meeting?";
    this.projectId = id;
    this.showModal = true;
  }

  //method to get meeting list
  private getAllProjects() {
    this.projectService.getAll()
      .subscribe(
        projects => { 
          this.projects = projects;
        });
  }

}
