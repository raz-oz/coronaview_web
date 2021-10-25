import { identifierModuleUrl } from '@angular/compiler';

export class LoginRequest {
    username: string;
    password: string;
    otp: string;
    tenant: string;

    constructor(username: string, password: string, otp: string, tenant: string) {
        this.username = username;
        this.password = password;
        this.otp = otp;
        this.tenant = tenant;
    }
}

