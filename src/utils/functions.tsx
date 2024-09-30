
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