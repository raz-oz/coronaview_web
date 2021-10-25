import { Component } from '@angular/core';
import { Inject, Injectable, OnInit } from '@angular/core';
import { AppModule } from './app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

// import * as Keycloak from 'keycloak-js'

// //keycloak init options
// let initOptions = {
//   url: 'http://localhost:8080/auth', realm: 'Admin', clientId: 'corona-web-client'
// }

// let keycloak = Keycloak(initOptions);

// keycloak.init({ onLoad: "login-required" }).success((auth) => {

//   if (!auth) {
//     window.location.reload();
//   } else {
//     console.log("Authenticated");
//   }

//   //bootstrap after authentication is successful.
//   platformBrowserDynamic().bootstrapModule(AppModule)
//     .catch(err => console.error(err));

//   localStorage.setItem("ang-token", keycloak.token);
//   localStorage.setItem("ang-refresh-token", keycloak.refreshToken);

//   setTimeout(() => {
//     keycloak.updateToken(70).success((refreshed) => {
//       if (refreshed) {
//         console.debug('Token refreshed' + refreshed);
//       } else {
//         console.warn('Token not refreshed, valid for '
//           + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
//       }
//     }).error(() => {
//       console.error('Failed to refresh token');
//     });


//   }, 60000)

// }).error(() => {
//   console.error("Authenticated Failed");
// });


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private STORAGE_KEY = 'corona_user_name';

  public userName: string;
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    var currentAppData = this.storage.get(this.STORAGE_KEY) || ["unknown"];
    this.userName = currentAppData[0].userName;
  }

  public setUserName(name: string) {
    this.userName = name;

    var currentAppData = this.storage.get(this.STORAGE_KEY) || [];
    currentAppData = [];
    // push new task to array
    currentAppData.push({
        userName: this.userName 
    });
    // insert updated array to local storage
    this.storage.set(this.STORAGE_KEY, currentAppData);
  }
}
