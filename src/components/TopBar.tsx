import { StyledTopBar } from "../styled-components/TopBar.tsx";
import { useTranslation } from "react-i18next";
import NormalTitle from "./NormalTitle.tsx";
import { useLocation } from "react-router-dom";
import Button from "./Button.tsx";

interface TopBarProps {
  className?: string;
}

const TopBar = ({ className }: TopBarProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  let buttons = undefined;

  if (location.pathname === "/") {
    buttons = (
      <div>
        <Button label={t("login")} />
        <Button label={t("register")} />
      </div>
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
