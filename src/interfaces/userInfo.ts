export interface UserInfo {
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    emailVerified: boolean;
    lastLogin: Date | string;
    lastPasswordReset: Date | string;
    updatedAt: Date | string;
    createdAt: Date | string;
}

interface IdUserInfo {
    id: string;
}

export interface CommonUserInfo {
    email: string,
    username: string,
    user_metadata: {
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
export type DataGridUserInfo = UserInfo & IdUserInfo;