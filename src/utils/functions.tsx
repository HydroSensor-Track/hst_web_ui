
export const getLogoAndFontSize = (logoSize?: string) => {
    let size = "";
    let fontSize = "";
    switch(logoSize){
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
    return {"logoWidth": size, "fontSize": fontSize};
}