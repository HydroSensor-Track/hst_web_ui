import { StyledTopBar, ButtonContainer } from "../styled-components/TopBar.tsx";
import { useTranslation } from "react-i18next";
import NormalTitle from "./NormalTitle.tsx";
import { useLocation } from "react-router-dom";
import Button from "./Button.tsx";
import Icon from "./Icon.tsx";

interface TopBarProps {
  className?: string;
}

interface SectionProps {
  title: string;
  buttons?: {label: string, icon_name: string}[]
}

const titleMappings: Record<string, SectionProps> = {
  "/": {
    title:"dashboard", 
    buttons: [
      {
        label: "downloadReport", 
        icon_name: "download" 
      }, 
      {
        label: "createGraph", 
        icon_name: "eastArrow" 
      }
    ]
  },
  "/tickets": {
    title:"tickets", 
    buttons: [
      {
        label: "createTicket", 
        icon_name: "add" 
      }
    ]
  },
  "/notifications": {
    title:"notifications"
  },
  "/backoffice": {
    title:"backoffice"
  }
};


const TopBar = ({ className }: TopBarProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const section = titleMappings[location.pathname] || "dashboard";
  return (
    <StyledTopBar className={className}>
      <NormalTitle>{t(section.title)}</NormalTitle>
      {section.buttons &&       
        <ButtonContainer>
          {section.buttons.map( (button) =>
            <Button label={t(button.label)} icon={<Icon name={button.icon_name} />} />
          )}
        </ButtonContainer>
      }
    </StyledTopBar>
  );
};
export default TopBar;
