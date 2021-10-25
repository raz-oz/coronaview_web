
import { HttpErrorResponse} from '@angular/common/http';
import { LoginResponse } from './../model/loginResponse';
import { AuthService } from './../service/auth/auth.service';
import { LoginRequest } from './../model/loginRequest';
import { LoginService } from './../service/auth/login.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  clickMessage: string;
  username: string;
  password: string;
  otp: string;
  tenant: string;

  constructor(private appComponent: AppComponent, 
              private authService: AuthService,
              private loginService: LoginService, 
              private router: Router) 
  {       
    this.username = "admin";
    this.password = "admin";
    this.otp = "";
    this.tenant = "Admin";
  }

  ngOnInit() {
  }

  setCredentials(name: string) {
    console.log("setCredentials", name);
    if (name == "admin") {
      this.username = name;
      this.password = "admin";
      this.tenant = "Admin";
    }
    else if (name == "americaAdmin") {
      this.username = name;
      this.password = "a12";
      this.tenant = "America";
    }
    else if (name == "europeAdmin") {
      this.username = name;
      this.password = "a12";
      this.tenant = "Europe";
    }
    else if (name == "asiaAdmin") {
      this.username = name;
      this.password = "a12";
      this.tenant = "Asia";
    }
    else if (name == "africaAdmin") {
      this.username = name;
      this.password = "a12";
      this.tenant = "Africa";
    }               
    else if (name == "all") {
      this.username = name;
      this.password = "u12";
      this.tenant = "All";
    }
    else if (name == "americaUser") {
      this.username = name;
      this.password = "u12";
      this.tenant = "America";
    }
    else if (name == "europeUser") {
      this.username = name;
      this.password = "u12";
      this.tenant = "Europe";
    }
    else if (name == "asiaUser") {
      this.username = name;
      this.password = "u12";
      this.tenant = "Asia";
    }
    else if (name == "africaUser") {
      this.username = name;
      this.password = "u12";
      this.tenant = "Africa";
    }
    else if (name == "euroAsiaUser") {
      this.username = name;
      this.password = "u12";
      this.tenant = "";
    }
    else if (name == "americaAfricaUser") {
      this.username = name;
      this.password = "u12";
      this.tenant = "";
    }
  }

  login() : void {
    var loginReq = new LoginRequest(this.username, this.password, this.otp, this.tenant);
    console.log("Login user...", loginReq);

    this.clickMessage = 'User ' + this.username + ' is under Login';
    this.loginService.login(loginReq).subscribe((res:LoginResponse) => { 
      this.clickMessage = 'User ' + this.username + ' has been Login successfully';
      console.log("Login user OK", res);
      this.authService.setToken(res.access_token, res.refresh_token);
      this.appComponent.setUserName(this.username);
      setTimeout(() => 
      {
        this.router.navigate(['/home']);
      },
      100);
    },
    err => {
      console.log("Login Failed", err);
      this.clickMessage = 'Login Failed. Error: ' + err.error.Error;
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.clickMessage = 'Login expired. Redirect to login page...';
        }
        this.clickMessage = 'Login Failed. Error: ' + err.message;

      }         
    } 
   );      
  }
}