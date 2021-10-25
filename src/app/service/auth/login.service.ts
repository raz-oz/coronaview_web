import { LoginRequest } from './../../model/loginRequest';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {

    private loginUrl: string;
    private logoutUrl: string;

  constructor(private http: HttpClient) {
    this.loginUrl  = 'http://localhost:8083/login';
    this.logoutUrl = 'http://localhost:8083/logout';
  }

  public login(login: LoginRequest) {
    return this.http.post(this.loginUrl, login);
  }

  public logout(refreshToken: string) {
    return this.http.post(this.logoutUrl, new LogoutRequest(refreshToken));
  }
}

class LogoutRequest {
    refresh: string;
    constructor(refresh: string) {
        this.refresh = refresh;
    }
}