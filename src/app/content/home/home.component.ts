import { Component, OnInit } from '@angular/core';
import { EventService, CommonService } from '../../_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public events: Event[] = [];
  public userInfo: String;
  menuList = [];

  constructor(private eventService: EventService,
      private commonService: CommonService) { }

  ngOnInit() {
  	this.getAllEvents();
    this.userInfo = this.commonService.getUserCookies();
    if(!!this.userInfo){
      console.log("user logged in");
      this.menuList = [{"link":"","text":"Logout"}];
    }
    else{
      this.menuList = [{"link":"login","text":"Login"},{"link":"register","text":"Register"}];
    }
  	let elem:Element = document.getElementById("myDropdown");
  	//elem.hide();
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
  clearLogin(event) {
    if(event == 'Logout'){
      this.commonService.deleteUserCookies();
    }
  }
  

}
