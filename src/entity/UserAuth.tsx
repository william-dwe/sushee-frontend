export interface IAuthReqLogin {
    identifier: string;
    password: string;
}
export interface IAuthReqRegister {
    full_name: string;
    email: string;
    phone: string
    username: string;
    password: string;
}

export interface IToken {
    access_token: string;
    role_name: string;
}

export interface IUserContext {
    data: {
        full_name : string;
        username : string;
        email : string;
        phone : string;
        profile_picture : string;
        play_attempt : number;
        role_id : number;
    }
}
export interface ITokenContent {
    exp: number,
    iat: number,
    user: IUserContext
}

export interface IAuthReqRegister {
    full_name: string;
    email: string;
    username: string;
    password: string;
}

export interface IAuthReqEditProfile {
    full_name: string;
    phone: string;
    email: string;
    password: string;
}

export interface IGetProfileRes {
    username: string;
    full_name: string;
    email: string;
    phone: string;
    profile_picture: string;
    play_attempt: number;
    role_id: number;
}
