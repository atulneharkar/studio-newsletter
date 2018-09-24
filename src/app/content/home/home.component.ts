import { Component, OnInit } from '@angular/core';
import { EventService, CommonService } from '../../_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public events: Event[] = [];

  constructor(private eventService: EventService,
      private commonService: CommonService) { }

  ngOnInit() {
  	this.getAllEvents();
  }

  //method to get event list
  private getAllEvents() {
    console.log("getting all events on home page");
    this.eventService.getAll()
      .subscribe(
        events => { 
          this.events = events;
          this.events = this.events.reverse();
          console.log("this.events",this.events);
        });
  }

}
