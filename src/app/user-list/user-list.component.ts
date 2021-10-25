import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse} from '@angular/common/http';
import { Router} from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { Tenant } from '../model/tenant';
import { TenantService } from '../service/tenant.service';
import { Role } from '../model/role';
import { RoleService } from '../service/role.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./../app.component.navbar.css']
})
export class UserListComponent implements OnInit {
 
  roles: Role[];
  tenants: Tenant[];
  users: User[];
 
  constructor(private router: Router,
              private userService: UserService, 
              private tenantsService: TenantService, 
              private roleService: RoleService) {
  }
 
  ngOnInit() {
    this.roleService.findAll().subscribe(res1 => {
      this.roles = res1;

      this.tenantsService.findAll().subscribe(res2 => {
        this.tenants = res2;

        this.userService.findAll().subscribe(res3 => {
          this.users = res3;
          for (var i = 0; i < this.users.length; i++) {
            this.users[i].roleName   = this.roleService.getRoleName(this.roles, this.users[i].roleID);
            this.users[i].tenantName = this.tenantsService.getTenantsName(this.tenants, this.users[i].tenantsID);
          }   
        });        
      });
    }, err => {
      var errMsg = err;
      if (err.error != null)
      {
        errMsg = err.error;
        if (err.error.Error != null)
          errMsg = err.error.Error; 
      }      this.clickMessage = 'Error Loading Error: ' + errMsg;
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.clickMessage = 'Login expired. Redirect to login page...';
          // redirect to the login route
          setTimeout(() => 
          {
            this.router.navigate(['/']);
          },
          2000);   
        }
      }      
    });
  }

  clickMessage = ''; 

  onUserAdd(user: User) {
    this.router.navigate(['/adduser']);
  }

  onUserUpdate(user: User) {
    this.userService.userToUpdate = user;
    this.router.navigate(['/adduser']);
  }

  onUserDelete(user: User) {
    this.clickMessage = 'User ' + user.userName + ' is under deletion';
    this.userService.delete(user).subscribe(res => { 
      this.clickMessage = 'User ' + user.userName + ' has been deleted';
      console.log("Delete user OK", res);
      setTimeout(() => 
      {
        this.ngOnInit();
      },
      2000);
    },
    err => {
      console.log("Delete user Failed", err);
      var errMsg = err;
      if (err.error != null)
      {
        errMsg = err.error;
        if (err.error.Error != null)
          errMsg = err.error.Error; 
      }      this.clickMessage = 'User ' + user.userName + ' has NOT been deleted. Error: ' + errMsg;
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.clickMessage = 'Login expired. Redirect to login page...';
          // redirect to the login route
          setTimeout(() => 
          {
            this.router.navigate(['/']);
          },
          2000);   
        }
      }              
    } 
   );
  }

  onRowSelected(user: User) {
    this.clickMessage = 'Selected User: ' + user.userName;
  }
}