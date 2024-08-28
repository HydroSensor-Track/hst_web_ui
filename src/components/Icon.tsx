// src/components/Icon.tsx
import React from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import TrendingFlatOutlinedIcon from "@mui/icons-material/TrendingFlatOutlined";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import { useTheme } from "styled-components";

interface IconProps {
  name: string;
}

const Icon = ({ name }: IconProps) => {
  const theme = useTheme();

  const icons: { [key: string]: JSX.Element } = {
    download: <FileDownloadOutlinedIcon />,
    eastArrow: <TrendingFlatOutlinedIcon />,
    dashboard: <DashboardRoundedIcon />,
    settings: <SettingsOutlinedIcon />,
    notifications: <NotificationsRoundedIcon />,
    backoffice: <ManageAccountsRoundedIcon />,
    logout: <LogoutRoundedIcon />,
    tools: <HandymanOutlinedIcon />,
  };

  return icons[name] || null;
};
export default Icon;
