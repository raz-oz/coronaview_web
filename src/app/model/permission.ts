import { identifierModuleUrl } from '@angular/compiler';

export class Permission {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}
