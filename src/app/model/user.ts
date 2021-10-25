export class User {
    public id: string;
    public firstName: string;
    public lastName: string;
    public userName: string;
    public password: string;
    public email: string;    
    public roleID: string;
    public roleName: string;
    public tenantsID: string[];    
    public tenantName: string;

    constructor(id: string, firstName: string, lastName: string, userName: string, password: string, email: string, roleID: string, tenantsID: string[]) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.roleID = roleID;
        this.tenantsID = tenantsID;
    }
}