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
    const confirmLogout = window.confirm("Quieres cerrar sesión?");
    if (confirmLogout) {
      logout();
    }
  };

  return (
    <SidebarContainer className={className}>
      <LogoAndTitle column={false} logoSize={"medium"} />
      <div style={{height: "75%"}}>
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

        </List>
      </div>
      <List>
      <StyledListItem
          onClick={() => handleNavigate("/backoffice")}
          className={location.pathname === "/backoffice" ? "active" : ""}
        >
          <Icon name="backoffice" />
          {t("backoffice")}
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
