//Logo and title
import Logo from "./Logo";
import { Title } from "../styled-components/Logo.tsx";
import {useTranslation} from "react-i18next";
import {CenteredDiv} from "../styled-components/common.tsx";
import {getLogoAndFontSize} from "../utils/functions.tsx";

const LogoAndTitle = ({column = true, logoSize}: {column?:boolean, logoSize?:string}) => {
    const { t } = useTranslation();
    const {logoWidth, fontSize} = getLogoAndFontSize(logoSize);
    return (
        <CenteredDiv $column={column}>
          <Logo style={{"width": logoWidth}}/>
          <div>
            <Title style={{"fontSize": "15px"}}>{t('title')}</Title>
          </div>

        </CenteredDiv>
  );
};

export default LogoAndTitle;