import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event } from '../model/event';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventsService {

  private eventsUrl: string;

  constructor(private http: HttpClient) {
    this.eventsUrl = 'http://localhost:8083/events';
  }

  public findAll(): Observable<Event[]> {
    console.log("Find all Events");
    return this.http.get<Event[]>(this.eventsUrl);
  }

  public delete(event: Event) {
    console.log("Event User", Event);
    return this.http.delete<Event>(this.eventsUrl+"/"+event.time);
  }
}