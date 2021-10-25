import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//https://swimlane.gitbook.io/ngx-charts/
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CustomMaterialModule } from './core/material.module';
import { MatDialogModule} from "@angular/material";

import { CommonModule } from '@angular/common';

import { AuthService } from './service/auth/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './service/auth/token.interceptor';
import { StorageServiceModule  } from 'ngx-webstorage-service';

import { HomeComponent } from './home/home.component';

import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserService } from './service/user.service';

import { RoleListComponent } from './role-list/role-list.component';
import { RoleService } from './service/role.service';
import { RoleFormComponent } from './role-form/role-form.component';

import { TenantListComponent } from './tenant-list/tenant-list.component';
import { TenantFormComponent } from './tenant-form/tenant-form.component';
import { TenantService } from './service/tenant.service';

import { CoronaListComponent } from './corona-list/corona-list.component';
import { IsraelOverallComponent } from './corona-list/israel-overall.component';

import { CoronaService } from './service/corona.service';
import { LoginService } from './service/auth/login.service';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { EventsComponent } from './events/events.component';
import { EventsService } from './service/events.service';
import { SessionsComponent } from './sessions/sessions.component';
import { SessionService } from './service/session.service';
import { SettingsComponent } from './settings/settings.component';
import { SettingsService } from './service/settings.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserListComponent,
    UserFormComponent,
    RoleListComponent,
    TenantListComponent,
    TenantFormComponent,
    CoronaListComponent,
    IsraelOverallComponent,
    RoleFormComponent,
    LoginComponent,
    LogoutComponent,
    EventsComponent,
    SessionsComponent,
    SettingsComponent ],
  imports: [
    MatDialogModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    CustomMaterialModule,
    StorageServiceModule 
  ],
  providers: [
    LoginService,
    UserService, 
    RoleService, 
    TenantService, 
    CoronaService,
    EventsService,
    SessionService,
    SettingsService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }