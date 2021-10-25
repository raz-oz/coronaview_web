import { Component } from '@angular/core';

@Component({
  selector: 'app-root-org',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
 
  constructor() {
    this.title = 'RADView Spring Boot - Angular Application';
  }
}
