import { HttpErrorResponse} from '@angular/common/http';
import { TenantService } from './../service/tenant.service';
import { RoleService } from './../service/role.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { Role } from './../model/role';
import { Tenant } from './../model/tenant';
import { Permission } from './../model/permission';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./../app.component.navbar.css']
})
export class RoleFormComponent implements OnInit {

  roles: Role[];
  tenants: Tenant[];
  users: User[];
  permissions: Permission[];

  model: Role;
  submitted = false;
  subitMsg = "";
  buttonName = "Add";

  heroForm: FormGroup;

  isEditMode: boolean; 
  
  constructor(private router: Router,
              private formBuilder: FormBuilder, 
              private userService: UserService,
              private roleService: RoleService,
              private tenantsService: TenantService) 
  {
    if (roleService.roleToUpdate === null || 
        roleService.roleToUpdate === undefined)
    {
      this.model = new Role("", "", []);
      this.isEditMode = false;
    }
    else
    {
      this.model = roleService.roleToUpdate;
      this.isEditMode = true;
      this.buttonName = "Update";
    }

    this.heroForm = this.formBuilder.group({}); 
  }

  ngOnInit() {
    this.permissions = [];
    this.roleService.getPermissions().subscribe((res:Permission[]) => {
      this.permissions = res;   
      console.log("Prmissions:", this.permissions);
    }, err => {
      var errMsg = err;
      if (err.error != null)
      {
        errMsg = err.error;
        if (err.error.Error != null)
          errMsg = err.error.Error; 
      }
      this.subitMsg = 'Error Loading Error: ' + errMsg;      
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.subitMsg = 'Login expired. Redirect to login page...';
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
 
  onSubmit() 
  {
    this.submitted = true;

    if (this.isEditMode)
    {
      console.log("Update Role", this.model);
      this.subitMsg = 'Role ' + this.model.name + ' is under update';
      this.roleService.update(this.model).subscribe(res => { 
        this.subitMsg = 'Role ' + this.model.name + ' has been updated';
        console.log("Role user OK", res);
        setTimeout(() => 
        {
          this.router.navigate(['/roles']);
        },
        2000);
      },
      err => {
        console.log("Update Role Failed", err);
        var errMsg = err;
        if (err.error != null)
        {
          errMsg = err.error;
          if (err.error.Error != null)
            errMsg = err.error.Error; 
        }
        this.subitMsg = 'Role ' + this.model.name + ' has NOT been updated. Error: : ' + errMsg;
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.subitMsg = 'Login expired. Redirect to login page...';
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
    this.roleService.roleToUpdate = null;
    }
    else
    {
      console.log("Add Role", this.model);
      this.subitMsg = 'Role ' + this.model.name + ' is under creation...';
      this.roleService.save(this.model).subscribe(res => { 
        this.subitMsg = 'Role ' + this.model.name + ' has been created';
        console.log("Create Role OK", res);
        setTimeout(() => 
        {
          this.router.navigate(['/roles']);
        },
        2000);      
      },
      err => {
        console.log("Create Role Failed", err);
        var errMsg = err;
        if (err.error != null)
        {
          errMsg = err.error;
          if (err.error.Error != null)
            errMsg = err.error.Error; 
        }
        this.subitMsg = 'Role ' + this.model.name + ' has NOT been created. Error: ' + errMsg;
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.subitMsg = 'Login expired. Redirect to login page...';
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
  }

  get diagnostic() { 
    return JSON.stringify(this.model); 
  }
}