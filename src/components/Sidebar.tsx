// src/components/Sidebar.tsx
import {List, ListItem, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import SidebarContainer from "../styled-components/Sidebar.tsx";

interface SidebarProps {
    className?: string;
}

const Sidebar = ({className}:SidebarProps) => {
    const navigate = useNavigate();

    const handleOnclick = (path: string) => {
        navigate(path);
    }

    return (
        <SidebarContainer className={className} >
            <Typography variant="h6" component="div" sx={{ padding: '10px' }}>
                HydroSensor
            </Typography>
            <List>
                <ListItem button onClick={ () => handleOnclick('/')}>
                    Dashboard
                </ListItem>
                <ListItem button onClick={ () => handleOnclick('/about')}>
                    Tickets
                </ListItem>
                <ListItem button onClick={ () => handleOnclick('/about')}>
                    Notifications
                </ListItem>
                <ListItem button onClick={ () => handleOnclick('/about')}>
                    Backoffice
                </ListItem>
            </List>
            <List>
                <ListItem button onClick={ () => handleOnclick('/about')}>
                    Configuración
                </ListItem>
                <ListItem button onClick={ () => handleOnclick('/about')}>
                    Salir
                </ListItem>
            </List>
        </SidebarContainer>
    )
}

export default Sidebar;