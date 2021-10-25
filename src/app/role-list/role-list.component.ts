import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse} from '@angular/common/http';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { Tenant } from '../model/tenant';
import { TenantService } from '../service/tenant.service';
import { Role } from '../model/role';
import { RoleService } from '../service/role.service';
import { Router} from '@angular/router';
 
@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./../app.component.navbar.css']
})
export class RoleListComponent implements OnInit {
 
  roles: Role[];
  clickMessage = ''; 

  constructor(private router: Router,
              private userService: UserService, 
              private tenantsService: TenantService, 
            private roleService: RoleService) {
  }
  
  ngOnInit() {
    this.roleService.findAll().subscribe(data => {
      this.roles = data;
      console.log("Roles", new Date() + ": " + JSON.stringify(data));
    }, err => {
      var errMsg = err;
      if (err.error != null)
      {
        errMsg = err.error;
        if (err.error.Error != null)
          errMsg = err.error.Error; 
      }
      this.clickMessage = 'Error Loading Error: ' + errMsg;      
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

  onRoleAdd(role: Role) {
    this.router.navigate(['/addrole']);
  }

  onRoleUpdate(role: Role) {
    this.roleService.roleToUpdate = role;
    this.router.navigate(['/addrole']);
  }

  onRoleDelete(role: Role) {
    this.clickMessage = 'Role ' + role.name + ' is under deletion';
    this.roleService.delete(role).subscribe(res => { 
      this.clickMessage = 'Role ' + role.name + ' has been deleted';
      console.log("Delete Role OK", res);
      setTimeout(() => 
      {
        this.ngOnInit();
      },
      2000);
    },
    err => {
      console.log("Delete Role Failed", err);
      var errMsg = err;
      if (err.error != null)
      {
        errMsg = err.error;
        if (err.error.Error != null)
          errMsg = err.error.Error; 
      }
      this.clickMessage = 'Role ' + role.name + ' has NOT been deleted. Error: ' + errMsg;
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

  onRowSelected(role: Role) {
    this.clickMessage = 'Selected Role: ' + role.name;
  }  
}
