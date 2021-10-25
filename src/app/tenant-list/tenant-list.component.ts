import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse} from '@angular/common/http';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { Tenant } from '../model/tenant';
import { TenantService } from '../service/tenant.service';
import { Role } from '../model/role';
import { RoleService } from '../service/role.service';
import { Router} from '@angular/router';
import { stringify } from 'querystring';

@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./../app.component.navbar.css']
})
export class TenantListComponent implements OnInit {
 
  tenants: Tenant[];
 
  constructor(private router: Router,
            private userService: UserService, 
            private tenantsService: TenantService, 
            private roleService: RoleService) {
  }
 
  ngOnInit() {
    this.tenantsService.findAll().subscribe(data => {
      this.tenants = data;
      console.log("Tenants", new Date() + ": " + JSON.stringify(data));
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

  onTenantKeycloak() {
    window.open('http://localhost:8080/auth/', "_blank");
  }

  onTenantAdd(tenant: Tenant) {
    this.router.navigate(['/addtenant']);
  }

  onTenantUpdate(tenant: Tenant) {
    this.tenantsService.tenantToUpdate = tenant;
    this.router.navigate(['/addtenant']);
  }

  onTenantDelete(tenant: Tenant) {
    this.clickMessage = 'Tenant ' + tenant.name + ' is under deletion';
    this.tenantsService.delete(tenant).subscribe(res => { 
      this.clickMessage = 'Tenant ' + tenant.name + ' has been deleted';
      console.log("Delete Tenant OK", res);
      setTimeout(() => 
      {
        this.ngOnInit();
      },
      2000);
    },
    err => {
      console.log("Delete Tenant Failed", err);
      var errMsg = err;
      if (err.error != null)
      {
        errMsg = err.error;
        if (err.error.Error != null)
          errMsg = err.error.Error; 
      }      this.clickMessage = 'Tenant ' + tenant.name + ' has NOT been deleted. Error: ' + errMsg;
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

  onRowSelected(tenant: Tenant) {
    this.clickMessage = 'Selected Tenant: ' + tenant.name;
  }
}
