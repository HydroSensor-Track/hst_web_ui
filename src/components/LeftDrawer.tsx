import {List, ListItem, Typography} from "@mui/material";
import Drawer from "../styled-components/LeftDrawer.tsx";
import {useNavigate} from "react-router-dom";


interface LeftDrawerProps {
    drawerOpen: boolean;
    toggleDrawer: () => void;
}

const LeftDrawer = ({ drawerOpen, toggleDrawer}: LeftDrawerProps) => {
    const navigate = useNavigate();

    const handleOnclick = (path: string) => {
        navigate(path);
        toggleDrawer();
    }

    return (
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
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
        </Drawer>
    )
}

export default LeftDrawer;