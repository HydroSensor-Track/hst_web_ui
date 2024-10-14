import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import TrendingFlatOutlinedIcon from "@mui/icons-material/TrendingFlatOutlined";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded';

import { useTheme } from "styled-components";

interface IconProps {
  name: string;
  htmlColor?: string;
}

const Icon = ({ name, htmlColor }: IconProps) => {
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
    delete: <DeleteRoundedIcon htmlColor={theme.colors.riskyOperation} />,
    edit: <EditRoundedIcon htmlColor={htmlColor} />,
    accountAvatar: <AccountCircleRoundedIcon />,
    addUser: <PersonAddAltRoundedIcon />,
    cancel: <CloseRoundedIcon htmlColor={htmlColor} />,
    check: <CheckRoundedIcon htmlColor={htmlColor} />,
    passwordEyeIcon: <VisibilityRoundedIcon />,
    passwordEyeClosedIcon: <VisibilityOffRoundedIcon />,
    checkCircle: <CheckCircleOutlineRoundedIcon htmlColor={htmlColor} />,
    cancelCircle: <CancelRoundedIcon htmlColor={htmlColor} />,
    changePassword: <PasswordRoundedIcon />,
  };

  return icons[name] || null;
};
export default Icon;
