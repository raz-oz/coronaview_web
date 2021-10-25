import { LoginResponse } from '../model/loginResponse';
import { AuthService } from '../service/auth/auth.service';
import { LoginService } from '../service/auth/login.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})

export class LogoutComponent implements OnInit {
  msg: string;
  constructor(private authService: AuthService,
              private loginService: LoginService, 
              private router: Router) 
  {       

  }

  ngOnInit() {
    this.logout();
  }

  logout() : void {
    console.log("Logout user...");
    this.msg = "Logging out...";

    this.loginService.logout(this.authService.getRefreshToken()).subscribe((res) => { 
      console.log("Logout user OK", res);
      this.authService.setToken("", "");
      setTimeout(() => 
      {
        this.router.navigate(['/']);
      },
      100);
    },
    err => {
      this.msg = "Logout Failed: " + err.message;
      console.log("Logout Failed", err);
      setTimeout(() => 
      {
        this.router.navigate(['/']);
      },
      3000);      
    } 
   );      
  }
}