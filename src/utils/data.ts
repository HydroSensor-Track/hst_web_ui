import { UserInfo } from "../interfaces/userInfo";

export const getCardDataPropsList = (userInfo: UserInfo) => {
    return [
        {
            key: 'email',
            title: 'emailHeader',
            field: 'email',
            value: userInfo.email,
            showHeader: true
        },
        {
            key: 'firstName',
            title: 'firstNameHeader',
            field: 'firstName',
            value: userInfo.firstName,
            showHeader: false,
        },
        {
            key: 'lastName',
            title: 'lastNameHeader',
            field: 'lastName',
            value: userInfo.lastName,
            showHeader: false,
        },
        {
            key: 'userName',
            title: 'userNameHeader',
            field: 'userName',
            value: userInfo.userName,
            showHeader: false,
        },
        {
            key: 'lastLogin',
            title: 'lastLoginHeader',
            field: null,
            value: userInfo.lastLogin,
            showHeader: false,
        },
        {
            key: 'lastPasswordReset',
            title: 'lastPasswordResetHeader',
            field: null,
            value: userInfo.lastPasswordReset,
            showHeader: false,
        },
        {
            key: 'updatedAt',
            title: 'updatedAtHeader',
            field: null,
            value: userInfo.updatedAt,
            showHeader: false,
        },
        {
            key: 'createdAt',
            title: 'createdAtHeader',
            field: null,
            value: userInfo.createdAt,
            showHeader: false,
        },
    ];
}