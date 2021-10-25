import { identifierModuleUrl } from '@angular/compiler';

export class Event {
    clientId: string;
    time: number;
    timeDisplay: string;
    tenant: string;
    type: string;
    error: string;
    ip: string;
    details: string;

    constructor(clientId: string, time: number, tenant: string, type: string, error: string, ip: string, details: string) {
        this.clientId = clientId;
        this.time = time;
        this.tenant = tenant;
        this.type = type;
        this.error = error;
        this.ip = ip;
        this.details = details;
    }
}
