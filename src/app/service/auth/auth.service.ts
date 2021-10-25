/*
* When handling authentication in an Angular app, 
* it’s generally best to put everything you need in a dedicated service. 
* Any authentication service should have a few basic methods for allowing users to log in and log out. 
* It should also include a method for retrieving a JSON Web Token 
* from wherever it is stored on the client and a way to determine if the user is authenticated or not.
*
* The goal is to include the JWT which is in local storage 
* as the Authorization header in any HTTP request that is sent.
*/
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, OnInit } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import * as jwt_decode from "jwt-decode";
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable()
export class AuthService implements OnInit
{
    // key that is used to access the data in local storageconst 
    private STORAGE_KEY = 'corona_app_data';

    private token: string;
    private refresh_token: string;


    constructor(private http: HttpClient, 
               @Inject(LOCAL_STORAGE) private storage: StorageService) {
      var currentAppData = this.storage.get(this.STORAGE_KEY) || [];
      var firstAppData = currentAppData[0] || "";
      this.token = firstAppData.token;
      this.refresh_token = firstAppData.refreshToken;
      //console.log("AuthService init Token", this.token);
      //console.log("AuthService init Refresh Token", this.refresh_token);
    }
    
    ngOnInit() {
    }

    public storeOnLocalStorage(token: string, refreshToken: string): void {
          
      // get array of tasks from local storage
      var currentAppData = this.storage.get(this.STORAGE_KEY) || [];
      currentAppData = [];
      // push new task to array
      currentAppData.push({
          token: token,
          refreshToken: refreshToken,
          isChecked: false 
      });
      // insert updated array to local storage
      this.storage.set(this.STORAGE_KEY, currentAppData);
      //console.log(this.storage.get(this.STORAGE_KEY) || 'Local storage is empty');
    }

    public setToken(access_token: string, refresh_token: string)
    {
      this.token = access_token;
      this.refresh_token = refresh_token;
      //console.log("AuthService setToken", this.token);
      this.storeOnLocalStorage(this.token, this.refresh_token);
    }

    public getToken(): string {
      return this.token;
    }

    public getRefreshToken(): string {
      return this.refresh_token;
    }

    private getDecodedAccessToken(): any {
      try {
          var tokenInfo = jwt_decode(this.token); // decode token
          console.log(tokenInfo);
          
          // decode header by passing in options (useful for when you need `kid` to verify a JWT):
          var decodedHeader = jwt_decode(this.token, { header: true });
          console.log(decodedHeader)

          return tokenInfo;
      }
      catch(Error){
          return null;
      }
    }

    private isAuthenticated(): boolean {
      // get the token
      const token = this.getToken();
      // return a boolean reflecting 
      // whether or not the token is expired
      return tokenNotExpired(null, token);
    }
}