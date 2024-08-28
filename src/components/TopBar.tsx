import { StyledTopBar, ButtonContainer } from "../styled-components/TopBar.tsx";
import { useTranslation } from "react-i18next";
import NormalTitle from "./NormalTitle.tsx";
import { useLocation } from "react-router-dom";
import Button from "./Button.tsx";
import Icon from "./Icon.tsx";

interface TopBarProps {
  className?: string;
}

const titleMappings: Record<string, string> = {
  "/": "dashboard",
  "/tickets": "tickets",
  "/notifications": "notifications",
  "/backoffice": "backoffice"
};


const TopBar = ({ className }: TopBarProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  let buttons = undefined;
  const title = titleMappings[location.pathname] || "dashboard";
  if (title === "dashboard") {
    buttons = (
      <ButtonContainer>
        <Button label={t("downloadReport")} icon={<Icon name="download" />} />
        <Button label={t("createGraph")} icon={<Icon name="eastArrow" />} />
      </ButtonContainer>
    );
  }

  return (
    <StyledTopBar className={className}>
      <NormalTitle>{t(title)}</NormalTitle>
      {buttons}
    </StyledTopBar>
  );
};
export default TopBar;
