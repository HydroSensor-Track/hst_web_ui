// src/components/Layout.tsx
import React from 'react';
import {StyledGrid, StyledTopBar, StyledSideBar, MainContent} from "../styled-components/StyledGrid.tsx";

interface LayoutProps {
    handleLogout: () => void;
    children: React.ReactNode;
}

const Layout = ({handleLogout, children}: LayoutProps) => {
    return (
        <StyledGrid>
            <StyledTopBar handleLogout={handleLogout} />
            <MainContent style={{gridArea: 'main'}}>
                {children}
            </MainContent>
            <StyledSideBar />
        </StyledGrid>
    );
}

export default Layout;