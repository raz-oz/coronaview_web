import { NumberCardModule } from '@swimlane/ngx-charts';

export class Settings {
    authentication: Authentication;
    authorization: Authorization
    events: boolean;
    isOnline: boolean;

    constructor(authentication: Authentication, authorization: Authorization, events: boolean, isOnline: boolean) {
        this.authentication = authentication;
        this.authorization = authorization;
        this.events = events;
        this.isOnline = isOnline;
    }
}

export class Authentication {
    token: Token;
    passwordPolicy: PasswordPolicy;
    otpPolicy: OtpPolicy;
    socialLogin: SocialLogin;

    constructor(token: Token, passwordPolicy: PasswordPolicy, otpPolicy: OtpPolicy, socialLogin: SocialLogin)  {
        this.token = token;
        this.passwordPolicy = passwordPolicy;
        this.otpPolicy = otpPolicy;
        this.socialLogin = socialLogin;
    }

}

export class Token {
    ssoSessionIdle: number = 30;
    ssoSessionMax: number = 600;
    offlineSessionIdle: number = 1500;
    accessTokenLifespan: number = 20;

    constructor(ssoSessionIdle: number, ssoSessionMax: number, offlineSessionIdle: number, accessTokenLifespan: number)  {
        this.ssoSessionIdle = ssoSessionIdle;
        this.ssoSessionMax = ssoSessionMax;
        this.offlineSessionIdle = offlineSessionIdle;
        this.accessTokenLifespan = accessTokenLifespan;
    }
}

export class PasswordPolicy {
    expirePassword: number = 365;
    minimumLength: number = 8;
    notRecentlyUsed: number = 3;
    digits: number = 1;
    notUsername: boolean = true;

    constructor(expirePassword: number, minimumLength: number, notRecentlyUsed: number, digits: number, notUsername: boolean)
    {
        this.expirePassword = expirePassword;
        this.minimumLength = minimumLength;
        this.notRecentlyUsed = notRecentlyUsed;
        this.digits = digits;
        this.notUsername = notUsername;
    }
}

export class OtpPolicy {
    enabled: boolean = false;
    optType: string = "Time Based";
    numberOfDigits: number =  8;
    optTokenPeriod: number = 30

    constructor(enabled: boolean, optType: string, numberOfDigits: number, optTokenPeriod: number) {
        this.enabled = enabled;
        this.optType = optType;
        this.numberOfDigits = numberOfDigits;
        this.optTokenPeriod = optTokenPeriod;
    }
}

export class SocialLogin {
    identityProvider: string = "None";

    constructor(identityProvider: string) {
        this.identityProvider = identityProvider;
    }
}
 
export class Authorization {
}