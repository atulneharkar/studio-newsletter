import { Component, OnInit } from '@angular/core';
import { EventService, CommonService } from '../../_services';
import { Event } from '../../_interfaces';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public events: Event[] = [];
  public userInfo: String;
  public domain: String;
  public userImage: String;
  public showInterested: Boolean;
  public showEmptyMsg: Boolean;
  public gradientArray: String[] = [];
  menuList = [];

  constructor(private eventService: EventService,
      private commonService: CommonService,
      private router: Router) { }

  ngOnInit() {
    this.gradientArray = [
      'linear-gradient(-135deg, #3C3890 0%, #3CE1BE 100%)',
      'linear-gradient(-135deg, #2988FA 0%, #DE5C2C 100%)',
      'linear-gradient(45deg, #2988FA 0%, #AFEF3D 100%)',
      'linear-gradient(44deg, #41FFA4 0%, #E14B79 100%)',
      'linear-gradient(-134deg, #4E3DEC 0%, #F08585 100%)'
    ]
    
    this.userInfo = this.commonService.getUserCookies();
    this.getAllEvents();
    if(!!this.userInfo){
      this.menuList = [{"link":"","text":"Logout"}];
    }
    else{
      this.menuList = [{"link":"login","text":"Login"},{"link":"register","text":"Register"}];
      this.showEmptyMsg = true;
    }
  	let elem:Element = document.getElementById("myDropdown");
  	//elem.hide();
  }

  //method to get event list
  private getAllEvents() {
    this.eventService.getAll()
      .subscribe(
        events => {
          this.events = events;
          var domain = this.commonService.getUserCookies().domain;
          console.log("domain name",domain);
          this.userImage = this.commonService.getUserCookies().avatar;
          this.events = this.events.reverse();
          this.events = this.events.filter(function(event){
            return event.invitees == domain;
          })
          this.events = this.events.filter(function(event){
            return new Date(event.slots[0].toDate.slice(0,10)).setHours(0,0,0,0) >= new Date().setHours(0,0,0,0)
          })
          this.events.forEach(function(ev){
            ev['isInterested'] = false;
          });
          console.log("this.events",this.events);
          if(this.events.length < 1){
            this.showEmptyMsg=true;
          }
          this.events.forEach(event => {
            if(!event.image) {
              event['gradient'] = Math.floor(Math.random() * 5)
            }
          })
          
        });
  }
  clearLogin(event) {
    if(event == 'Logout'){
      this.commonService.deleteUserCookies();
      this.router.navigate(['/login']);
    }
  }
  showCreaterDetails(index){
    this.events[index]['isInterested'] = true;
  }


}
