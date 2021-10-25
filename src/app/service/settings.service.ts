import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Settings } from '../model/settings';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SettingsService {

  private settingsUrl: string;

  constructor(private http: HttpClient) {
    this.settingsUrl = 'http://localhost:8083/settings';
  }

  public get(): Observable<Settings> {
    console.log("Get Settings");
    return this.http.get<Settings>(this.settingsUrl);
  }

  public update(settings: Settings) {
    console.log("Update Settings", settings);
    return this.http.post<Settings>(this.settingsUrl, settings);
  }

}