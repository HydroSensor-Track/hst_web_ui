import { TFunction } from "i18next";

import { UserInfo, UserCompleteInfo } from "../interfaces/userInfo";
import { NetworkData } from "../interfaces/sensorInfo";

export const getLogoAndFontSize = (logoSize?: string) => {
    let size = "";
    let fontSize = "";
    switch (logoSize) {
        case "small":
            size = "30px";
            fontSize = "10px";
            break;
        case "medium":
            size = "40px";
            fontSize = "20px";
            break;
        case "large":
            size = "50px";
            fontSize = "30px";
            break;
        default:
            size = "100px";
            fontSize = "40px";
    }
    return { "logoWidth": size, "fontSize": fontSize };
}

export const isValidEmail = (email: string) => {
    if (!email) {
        return false;
    }

    const emailWithoutSpaces = email.trimEnd();
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(emailWithoutSpaces.toLowerCase());
};

export const isValidPassword = (password: string) => {
    if (!password) {
        return false;
    }

    /*const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);*/
    return password.length >= 8;
};

export const isValidUserName = (userName: string) => {
    if (!userName) {
        return false;
    }
    //regex for username: only letters and numbers, at least 1 characters, no spaces and at most 15 characters, and ony _ and -
    const userNameRegex = /^[a-zA-Z0-9_-]{1,15}$/;
    return userNameRegex.test(userName);
};

export const transformUserCompleteInfoToUserInfo = (user: Partial<UserCompleteInfo>): UserInfo => {
    return {
        firstName: user?.user_metadata?.first_name ?? 'noData',
        lastName: user?.user_metadata?.last_name ?? 'noData',
        email: user?.email ?? 'noData',
        userName: user?.username ?? 'noData',
        emailVerified: user?.emailVerified ?? false,
        lastLogin: user?.lastLogin ?? 'noData',
        lastPasswordReset: user?.lastPasswordReset ?? 'noData',
        updatedAt: user?.updatedAt ?? 'noData',
        createdAt: user?.createdAt ?? 'noData',
    };
};

export const getTranslatedValueOrDateString = (
    value: string | Date,
    t: TFunction<"translation", undefined>
) => {
    if (value instanceof Date) {
        console.log("Date: ", value);
        return value.toString();
    }

    const date = new Date(value);
    if (date instanceof Date && !isNaN(date.getTime())) {
        return date.toLocaleString();
    }

    return t(value);
};

export function sortNetworksByLocation(networks: NetworkData) {

    const sortedNetworks: NetworkData = {};

    Object.keys(networks).forEach((network) => {
        const locations = networks[network];

        // Ordenar las ubicaciones directamente usando Object.fromEntries y Object.entries
        sortedNetworks[network] = Object.fromEntries(
            Object.entries(locations).sort(([a], [b]) => a.localeCompare(b))
        );
    });

    return sortedNetworks;
}

export const formatDate = (dateString: string, isMobile: boolean): string => {
    const date: Date = new Date(dateString);

    if (isMobile) {
        const aux_date = date.getDate();
        const aux_month = date.getMonth() + 1;
        const aux_year = date.getFullYear();
        const aux_hour = date.getHours();
        const aux_minutes = date.getMinutes();
        const aux_seconds = date.getSeconds();
        return `${aux_year}-${aux_month}-${aux_date}T${aux_hour}:${aux_minutes}:${aux_seconds}`;
    }

    return dateString;
};