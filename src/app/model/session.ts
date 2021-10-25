import { identifierModuleUrl } from '@angular/compiler';

export class Session {
    id: string;
    username: string;
    userId: string;
    ipAddress: string;
    start: number;
    startDisplay: string;
    lastAccess: number;
    lastAccessDisplay: string;

    constructor(id: string, username: string, userId: string, ipAddress: string, start: number, lastAccess: number) {
        this.id = id;
        this.username = username;
        this.userId = userId;
        this.ipAddress = ipAddress;
        this.lastAccess = lastAccess;
    }
}
