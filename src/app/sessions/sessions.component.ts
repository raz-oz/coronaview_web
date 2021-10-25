import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { HttpErrorResponse} from '@angular/common/http';
import { Session } from '../model/session';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./../app.component.navbar.css']
})
export class SessionsComponent implements OnInit {

  sessions: Session[];
  clickMessage = ''; 

  constructor(private router: Router, private sessionService: SessionService) { }

  ngOnInit() {
    this.sessionService.findAll().subscribe(data => {
      this.sessions = data;
      this.adjustDisplay(this.sessions);
      console.log("Sessions", new Date() + ": " + JSON.stringify(data));
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

  private adjustDisplay(sessions: Session[]) {
    for (var i = 0; i < sessions.length; i++) {
      sessions[i].startDisplay = this.convert2Date(sessions[i].start);
      sessions[i].lastAccessDisplay = this.convert2Date(sessions[i].lastAccess);
    }    
  }

  convert2Date(date:number) {
    //return new Date(date).toDateString();
    return new Date(date).toLocaleString();
  }

  onTenantKeycloak() {
    window.open('http://localhost:8080/auth/', "_blank");
  }  

  onDelete(session: Session) {

  }

  onRowSelected(session: Session) {

  }  
}
