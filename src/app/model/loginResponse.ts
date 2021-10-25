export class LoginResponse {
    public access_token: string;
    public expires_in: number;
    public refresh_expires_in: number;
    public refresh_token: string;

    constructor(access_token: string, expires_in: number, refresh_expires_in: number, refresh_token: string) {
        this.access_token = access_token;
        this.expires_in = expires_in;
        this.refresh_expires_in = refresh_expires_in;
        this.refresh_token = refresh_token;
    }    
}