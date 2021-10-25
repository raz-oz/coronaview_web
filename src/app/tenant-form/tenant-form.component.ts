import { HttpErrorResponse} from '@angular/common/http';
import { TenantService } from './../service/tenant.service';
import { RoleService } from './../service/role.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { Role } from './../model/role';
import { Tenant } from './../model/tenant';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-tenant-form',
  templateUrl: './tenant-form.component.html',
  styleUrls: ['./../app.component.navbar.css']
})
export class TenantFormComponent implements OnInit {

  tenants: Tenant[];

  model: Tenant;
  submitted = false;
  subitMsg = "";
  buttonName = "Add";

  heroForm: FormGroup;

  isEditMode: boolean;  
  continents: string[];

  constructor(private router: Router,
              private formBuilder: FormBuilder, 
              private userService: UserService,
              private roleService: RoleService,
              private tenantService: TenantService) 
  {
    this.continents = ["Asia", "America", "Europe"]

    if (tenantService.tenantToUpdate === null || 
        tenantService.tenantToUpdate === undefined)
    {
      this.model = new Tenant("", "", []);
      this.isEditMode = false;
    }
    else
    {
       this.model = tenantService.tenantToUpdate;
       this.isEditMode = true;
       this.buttonName = "Update";
    }

    this.heroForm = this.formBuilder.group({});     
  }

  ngOnInit() {
  } 
 
  onSubmit() 
  {
    this.submitted = true;

    if (this.isEditMode)
    {
      console.log("Update Tenant", this.model);
      this.subitMsg = 'Tenant ' + this.model.name + ' is under update';
      this.tenantService.update(this.model).subscribe(res => { 
        this.subitMsg = 'Tenant ' + this.model.name + ' has been updated';
        console.log("Tenant user OK", res);
        setTimeout(() => 
        {
          this.router.navigate(['/tenants']);
        },
        2000);
      },
      err => {
        console.log("Update Tenant Failed", err);
        var errMsg = err;
        if (err.error != null)
        {
          errMsg = err.error;
          if (err.error.Error != null)
            errMsg = err.error.Error; 
        }
        this.subitMsg = 'Tenant ' + this.model.name + ' has NOT been updated. Error: : ' + errMsg;
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
    this.tenantService.tenantToUpdate = null;
    }
    else
    {
      console.log("Add Tenant", this.model);
      this.subitMsg = 'Tenant ' + this.model.name + ' is under creation...';
      this.tenantService.save(this.model).subscribe(res => { 
        this.subitMsg = 'Tenant ' + this.model.name + ' has been created';
        console.log("Create Tenant OK", res);
        setTimeout(() => 
        {
          this.router.navigate(['/tenants']);
        },
        2000);      
      },
      err => {
        console.log("Create Tenant Failed", err);
        var errMsg = err;
        if (err.error != null)
        {
          errMsg = err.error;
          if (err.error.Error != null)
            errMsg = err.error.Error; 
        }
        this.subitMsg = 'Tenant ' + this.model.name + ' has NOT been created. Error: ' + errMsg;
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
