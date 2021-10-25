import { identifierModuleUrl } from '@angular/compiler';

export class Role {
    id: string;
    name: string;
    permissions: string[];

    constructor(id: string, name: string, permissions: string[]) {
        this.id = id;
        this.name = name;
        this.permissions = permissions;
    }
}
