// src/components/Layout.tsx
import React from 'react';
import {StyledGrid, StyledTopBar, StyledSideBar, MainContent} from "../styled-components/StyledGrid.tsx";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
    return (
        <StyledGrid>
            <StyledTopBar />
            <MainContent style={{gridArea: 'main'}}>
                {children}
            </MainContent>
            <StyledSideBar />
        </StyledGrid>
    );
}

export default Layout;