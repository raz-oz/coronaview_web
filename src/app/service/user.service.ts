import { TenantService } from './tenant.service';
import { RoleService } from './role.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  private usersUrl: string;
  public userToUpdate : User;

  constructor(private http: HttpClient, private roleService: RoleService, private tenantService: TenantService) {
    this.usersUrl = 'http://localhost:8083/users';
  }

  public findAll(): Observable<User[]> {
    console.log("Find all Users");
    return this.http.get<User[]>(this.usersUrl);
  }

  public delete(user: User) {
    console.log("Delete User", user);
    return this.http.delete<User>(this.usersUrl+"/"+user.id);
  }

  public update(user: User) {
    console.log("Update User", user);
    return this.http.put<User>(this.usersUrl+"/"+user.id, user);
  }

  public save(user: User) {
    console.log("Save User", user);
    return this.http.post<User>(this.usersUrl, user);
  }

  public getUsersSample()  {
    var roleList    = this.roleService.getRolesSample();
    var tenantsList = this.tenantService.getTenantsSample();

    var users = [];
    users.push(new User("1",   "--", "--", "admin", "admin", "admin@rad.com", "1", ["1"]));
    users.push(new User("101", "Joe", "--", "americaAdmin", "ps12", "americaAdmin@rad.com", "2", ["301"]));
    users.push(new User("102", "Bob", "--", "europeAdmin",  "ps12", "europeAdmin@rad.com", "2", ["302"]));
    users.push(new User("103", "Jian", "--", "asiaAdmin",    "ps12", "asiaAdmin@rad.com", "2", ["303"]));
    users.push(new User("104", "Zulu", "--", "africaAdmin",  "ps12", "africaAdmin@rad.com", "2", ["304"]));

    users.push(new User("201", "--", "--", "all", "u12", "all@rad.com", "3", ["1"]));
    users.push(new User("202", "--", "--", "americaUser", "u12", "americaUser@rad.com", "3", ["301"]));
    users.push(new User("203", "--", "--", "europeUser", "u12", "europeUser@rad.com", "3", ["302"]));
    users.push(new User("204", "--", "--", "asiaUser", "u12", "asiaUser@rad.com", "3", ["303"]));
    users.push(new User("205", "--", "--", "africaUser", "u12", "africaUser@rad.com", "3", ["304"]));
    users.push(new User("206", "--", "--", "amerieuroAsiaUsercaUser", "u12", "euroAsiaUser@rad.com", "3", ["301, 303"]));
    users.push(new User("207", "--", "--", "americaAfricaUser", "u12", "americaAfricaUser@rad.com", "3", ["302, 304"]));

    return users;
  }
}