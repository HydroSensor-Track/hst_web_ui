import { StyledTopBar, ButtonContainer } from "../styled-components/TopBar.tsx";
import { useTranslation } from "react-i18next";
import NormalTitle from "./NormalTitle.tsx";
import { useLocation } from "react-router-dom";
import Button from "./Button.tsx";
import Icon from "./Icon.tsx";

interface TopBarProps {
  className?: string;
}

const TopBar = ({ className }: TopBarProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  let buttons = undefined;
  if (location.pathname === "/") {
    buttons = (
      <ButtonContainer>
        <Button label={t("downloadReport")} icon={<Icon name="download" />} />
        <Button label={t("createGraph")} icon={<Icon name="eastArrow" />} />
      </ButtonContainer>
    );
  }

  return (
    <StyledTopBar className={className}>
      <NormalTitle>{t("dashboard")}</NormalTitle>
      {buttons}
    </StyledTopBar>
  );
};
export default TopBar;
