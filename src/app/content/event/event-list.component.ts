import { Component, OnInit } from '@angular/core';

import { EventService, CommonService } from '../../_services';
import { Event } from '../../_interfaces';
import {Router} from "@angular/router";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html'
})
export class EventListComponent implements OnInit {

  public events: Event[] = [];
  public message: string = '';
  public modalType: string = "confirm";
  public showModal: boolean = false;
  public isConfirmed: boolean = false;
  public eventId: number;
  public showSnapshot: boolean = false;
  public showHide: boolean = false;
  public currentUser: number;

  constructor(
      private eventService: EventService,
      private router: Router,
      private commonService: CommonService) {
  }

  ngOnInit() {
    this.getCurrentUrl();
    this.getAllEvents();

    this.currentUser = this.commonService.getUserCookies();
    if(!this.currentUser){
      this.router.navigate(['/login']);
    }
  }

  //method to get current route from the url
  getCurrentUrl() {
    this.showSnapshot = (location.href.indexOf('events') !== -1) ? false : true;
  }

  //method to confirm users action (delete)
  confirmAction(event) {
    this.isConfirmed = event;
    if(event) {
      this.eventService.delete(this.eventId).subscribe(() => { this.getAllEvents() });
    }
    this.showModal = false;
  }

  //method to delete event
  deleteEvent(id: number) {
    this.message = "Are you sure you want to delete event?";
    this.eventId = id;
    this.showModal = true;
  }

  //method to get event list
  private getAllEvents() {
    this.eventService.getAll()
      .subscribe(
        events => { 
          this.events = events;
          this.events = this.events.reverse();
        });
  }

}
