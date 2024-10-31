// src/components/Sidebar.tsx
import { List } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import {
  SidebarContainer,
  StyledListItem,
} from "../styled-components/Sidebar.tsx";
import { useTranslation } from "react-i18next";
import LogoAndTitle from "./LogoAndTitle.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import Icon from "./Icon.tsx";
interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const location = useLocation();
  const handleNavigate = (path: string) => {
    console.log(location);
    navigate(path);
  };

  const { logout } = useAuth0();

  const handleLogOut = () => {
    // Ask for confirmation before logging out
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      logout();
    }
  };

  return (
    <SidebarContainer className={className}>
      <LogoAndTitle column={false} logoSize={"medium"} />
      <List>
        <StyledListItem
          onClick={() => handleNavigate("/")}
          className={location.pathname === "/" ? "active" : ""}
        >
          <Icon name="dashboard" />
          {t("dashboard")}
        </StyledListItem>
        <StyledListItem
          onClick={() => handleNavigate("/tickets")}
          className={location.pathname === "/tickets" ? "active" : ""}
        >
          <Icon name="tools" />
          {t("tickets")}
        </StyledListItem>
        <StyledListItem
          onClick={() => handleNavigate("/notifications")}
          className={location.pathname === "/notifications" ? "active" : ""}
        >
          <Icon name="notifications" />
          {t("notifications")}
        </StyledListItem>
        <StyledListItem
          onClick={() => handleNavigate("/backoffice")}
          className={location.pathname === "/backoffice" ? "active" : ""}
        >
          <Icon name="backoffice" />
          {t("backoffice")}
        </StyledListItem>
      </List>
      <List>
        <StyledListItem
          onClick={() => handleNavigate("/config")}
          className={location.pathname === "/config" ? "active" : ""}
        >
          <Icon name="settings" />
          {t("configuration")}
        </StyledListItem>
        <StyledListItem onClick={() => handleLogOut()}>
          <Icon name="logout" />
          {t("logout")}
        </StyledListItem>
      </List>
    </SidebarContainer>
  );
};

export default Sidebar;
