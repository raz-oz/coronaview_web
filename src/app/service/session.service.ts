import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Session } from '../model/session';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SessionService {

  private sessionsUrl: string;

  constructor(private http: HttpClient) {
    this.sessionsUrl = 'http://localhost:8083/sessions';
  }

  public findAll(): Observable<Session[]> {
    console.log("Find all Sessions");
    return this.http.get<Session[]>(this.sessionsUrl);
  }

  public delete(session: Session) {
    console.log("Session User", session);
    return this.http.delete<Session>(this.sessionsUrl+"/"+session.id);
  }
}