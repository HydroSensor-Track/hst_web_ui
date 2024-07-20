import {useTranslation} from "react-i18next";

const About = () => {
    const {t} = useTranslation();
    return (
        <div>
            <h1>{t("About Page")}</h1>
        </div>
    );
};

export default About;