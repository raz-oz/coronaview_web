import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tenant } from '../model/tenant';
import { Observable } from 'rxjs/Observable';
import { stringify } from 'querystring';

@Injectable()
export class TenantService {

  private tenantsUrl: string;
  public tenantToUpdate : Tenant;

  constructor(private http: HttpClient) {
    this.tenantsUrl = 'http://localhost:8083/tenants';
  }

  public findAll(): Observable<Tenant[]> {
    console.log("Find all Tenants");
    return this.http.get<Tenant[]>(this.tenantsUrl);
  }

  public delete(tenant: Tenant) {
    console.log("Delete Tenant", tenant);
    return this.http.delete<Tenant>(this.tenantsUrl+"/"+tenant.id);
  }

  public update(tenant: Tenant) {
    console.log("Update Tenant", tenant);
    return this.http.put<Tenant>(this.tenantsUrl+"/"+tenant.id, tenant);
  }

  public save(tenant: Tenant) {
    console.log("Save Tenant", tenant);
    return this.http.post<Tenant>(this.tenantsUrl, tenant);
  }

  public getTenantsName(tenants: Tenant[], ids: string[])
  {
    if (tenants == null)
      return JSON.stringify(ids);;

    var result: string;
    result = "";
    for (var i = 0; i < tenants.length; i++) {
      for (var j = 0; j < ids.length; j++)
      {
        if (tenants[i].id == ids[j])
        {
          result = result + " " + tenants[i].name;
          break;
        }
      }
    }
    return result;//JSON.stringify(ids);
  }

  public getTenantsSample() {
    var list = [];
    list.push(new Tenant("100", "Admin", []));
    list.push(new Tenant("200", "All", []));
    list.push(new Tenant("301", "America", []));
    list.push(new Tenant("302", "Europe", []));
    list.push(new Tenant("303", "Australia", []));
    list.push(new Tenant("304", "Africa", []));
    return list;
  }
}
