interface UserInfo {
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    emailVerified: boolean;
    lastLogin: string;
    lastPasswordReset: string;
    updatedAt: string;
    createdAt: string;
}

export interface CommonUserInfo {
    email: string,
    userName: string,
    userMetadata: {
        [key: string]: string;
    }
}

export interface UserPassword {
    password: string;
    connection: string;
}

interface UserStatus {
    emailVerified: boolean;
    lastLogin: Date;
    lastPasswordReset: Date;
    updatedAt: Date;
    createdAt: Date;
}

interface UserId {
    userId: string;
}

export type UserCompleteInfo = CommonUserInfo & UserStatus & UserId;

export default UserInfo;