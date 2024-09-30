import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { StyledTopBar } from "../styled-components/TopBar.tsx";
import { useButtonConfig } from "../utils/ButtonConfig.tsx";
import NormalTitle from "./NormalTitle.tsx";
import { useModal } from "../contexts/ModalContext.tsx";

interface TopBarProps {
  className?: string;
}

const TopBar = ({ className }: TopBarProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { updateOpenModal } = useModal();

  const pathTitles: { [key: string]: string } = {
    "/": "dashboard",
    "/tickets": "tickets",
    "/backoffice": "backoffice",
    "/notifications": "notifications"
  };

  const buttonHandlers = {
    "addNewUser": () => {
      updateOpenModal(true);
    },
    // Add more handlers as needed
  };

  const titleKey = pathTitles[location.pathname] || "defaultTitle";
  const title = t(titleKey);

  const buttons = useButtonConfig(t, buttonHandlers)[location.pathname];

  return (
    <StyledTopBar className={className}>
      <NormalTitle>{title}</NormalTitle>
      {buttons}
    </StyledTopBar>
  );
};
export default TopBar;
