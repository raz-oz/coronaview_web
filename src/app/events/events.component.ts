import { Component, OnInit } from '@angular/core';
import { Event } from '../model/event';
import { EventsService } from '../service/events.service';
import { Router} from '@angular/router';
import { HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./../app.component.navbar.css']
})
export class EventsComponent implements OnInit {

  events: Event[];
  clickMessage = ''; 

  constructor(private router: Router, private eventsService: EventsService) { }

  ngOnInit(): void {
    this.eventsService.findAll().subscribe(data => {
      this.events = data;
      this.adjustDisplay(this.events);
      console.log("Events", new Date() + ": " + JSON.stringify(data));
    }, err => {
      var errMsg = err;
      if (err.error != null)
      {
        errMsg = err.error;
        if (err.error.Error != null)
          errMsg = err.error.Error; 
      }      this.clickMessage = 'Error Loading Error: ' + errMsg;      
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.clickMessage = 'Login expired. Redirect to login page...';
          // redirect to the login route
          setTimeout(() => 
          {
            this.router.navigate(['/']);
          },
          2000);   
        }
      }      
    });
  }
  onTenantKeycloak() {
    window.open('http://localhost:8080/auth/', "_blank");
  }  

  private adjustDisplay(events: Event[]) {
    for (var i = 0; i < events.length; i++) {
      events[i].timeDisplay = this.convert2Date(events[i].time);
      if (events[i].error == "null")
        events[i].error = "";
    }    
  }

  convert2Date(date:number) {
    //return new Date(date).toDateString();
    var date2 = Math.floor(date / 1000) *1000;
    return new Date(date2).toLocaleString();
  }

  onDelete(event: Event) {

  }

  onRowSelected(event: Event) {

  }
}
