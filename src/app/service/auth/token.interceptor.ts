import { Injectable, Component } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { jsonpFactory } from '@angular/http/src/http_module';

@Injectable()
export class TokenInterceptor implements HttpInterceptor 
{
  constructor(public auth: AuthService) {}

  /* 
  * Using interceptors is all about changing outgoing requests and incoming responses, 
  * but we can’t tamper with the original request–it needs to be immutable
  * 
  * Now when we make any HTTP request, the user’s token will be attached automatically.
  */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.endsWith("login"))
      return next.handle(request); 
      
    var token = `Bearer ${this.auth.getToken()}`;
    //console.log("Request adding token ", token);
    //console.log("Request adding token ", request);
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    });
 
    //Calling next.handle means that we are passing control to the next interceptor in the chain, if there is one
    return next.handle(request); 
  }
}