// src/components/Sidebar.tsx
import {List, ListItem} from "@mui/material";
import {useNavigate} from "react-router-dom";
import SidebarContainer from "../styled-components/Sidebar.tsx";
import {useTranslation} from "react-i18next";
import LogoAndTitle from "./LogoAndTitle.tsx";

interface SidebarProps {
    className?: string;
}

const Sidebar = ({className}:SidebarProps) => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const handleOnclick = (path: string) => {
        navigate(path);
    }

    return (
        <SidebarContainer className={className} >
            <LogoAndTitle column={false} logoSize={"medium"}/>
            <List>
                <ListItem button onClick={ () => handleOnclick('/')} >
                    {t('dashboard')}
                </ListItem>
                <ListItem button onClick={ () => handleOnclick('/about')}>
                    {t('tickets')}
                </ListItem>
                <ListItem button onClick={ () => handleOnclick('/about')}>
                    {t('notifications')}
                </ListItem>
                <ListItem button onClick={ () => handleOnclick('/about')}>
                    {t('backoffice')}
                </ListItem>
            </List>
            <List>
                <ListItem button onClick={ () => handleOnclick('/about')}>
                    {t('configuration')}
                </ListItem>
                <ListItem button onClick={ () => handleOnclick('/about')}>
                    {t('logout')}
                </ListItem>
            </List>
        </SidebarContainer>
    )
}

export default Sidebar;