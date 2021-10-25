export class Tenant {
    id: string;
    name: string;
    continents: string[];

    constructor(id: string, name: string, continents: string[]) {
        this.id = id;
        this.name = name;
        this.continents = continents;
    }
}
