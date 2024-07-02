import styled from "styled-components";
import TopBar from "../components/TopBar.tsx";
import Sidebar from "../components/Sidebar.tsx";

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 100px 1fr;
  grid-template-areas: 
    "side header"
    "side main";
  height: 100vh;
`;
const StyledTopBar = styled(TopBar)`
  grid-area: header ;
  background-color: ${(props) => props.theme.colors.componentBackground};
`;

const StyledSideBar = styled(Sidebar)`
  grid-area: side;
`

const MainContent = styled.main`
    grid-area: main;
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    padding: 20px;
`;

export {StyledGrid,StyledTopBar,StyledSideBar,MainContent};