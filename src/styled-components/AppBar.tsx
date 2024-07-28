import {AppBar} from "@mui/material";
import styled from "styled-components";


const AppBarContainer = styled(AppBar)`
  && {
    background-color: ${(props) => props.theme.colors.componentBackground};
    color: ${(props) => props.theme.colors.text};
    justify-content: center;
  }
`;

export {AppBarContainer};

