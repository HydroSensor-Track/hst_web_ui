import { IconButton, Toolbar, Typography, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from "react";
import {AppBarContainer} from "../styled-components/AppBar.tsx";

interface TopBarProps {
    handleLogout: () => void;
    className?: string;
}

const TopBar = ({handleLogout, className}: TopBarProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBarContainer position="static" className={className}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" component="div">
                    Dashboard
                </Typography>
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>Option 1</MenuItem>
                    <MenuItem onClick={handleClose}>Option 2</MenuItem>
                    <MenuItem onClick={handleLogout}>Log out</MenuItem>
                </Menu>
            </Toolbar>
        </AppBarContainer>
    );
}
export default TopBar;