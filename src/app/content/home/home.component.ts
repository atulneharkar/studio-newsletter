import { Component, OnInit } from '@angular/core';
import { EventService, CommonService } from '../../_services';
import { Event } from '../../_interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public events: Event[] = [];
  public userInfo: String;
  public gradientArray: String[] = [];
  menuList = [];

  constructor(private eventService: EventService,
      private commonService: CommonService) { }

  ngOnInit() {
    this.gradientArray = [
      'linear-gradient(-135deg, #3C3890 0%, #3CE1BE 100%)',
      'linear-gradient(-135deg, #2988FA 0%, #DE5C2C 100%)',
      'linear-gradient(45deg, #2988FA 0%, #AFEF3D 100%)',
      'linear-gradient(44deg, #41FFA4 0%, #E14B79 100%)',
      'linear-gradient(-134deg, #4E3DEC 0%, #F08585 100%)'
    ]

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
          this.events.forEach(event => {
            if(!event.image) {
              event['gradient'] = Math.floor(Math.random() * 5)
            }
          })
          console.log("this.events",this.events);
        });
  }
  clearLogin(event) {
    if(event == 'Logout'){
      this.commonService.deleteUserCookies();
      window.location.reload();
    }
  }


}
