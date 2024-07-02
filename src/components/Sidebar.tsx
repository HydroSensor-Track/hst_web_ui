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
                Navigate
            </Typography>
            <List>
                <ListItem button onClick={ () => handleOnclick('/')}  sx={{ fontSize: '18px', color: '#f80000', margin: '10px 0' }}>
                    Home
                </ListItem>
                <ListItem button onClick={ () => handleOnclick('/about')} sx={{ fontSize: '18px', color: '#f80000', margin: '10px 0' }}>
                    About
                </ListItem>
            </List>
        </SidebarContainer>
    )
}

export default Sidebar;