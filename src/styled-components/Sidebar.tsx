import styled from "styled-components";
import { ListItem } from "@mui/material";

export const SidebarContainer = styled.div`
  background-color: ${(props) => props.theme.colors.sideBarBackground};
  color: ${(props) => props.theme.colors.text};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: auto;

  @media (max-width: 768px) {
    width: 65px;
  }
`;

export const StyledListItem = styled(ListItem)`
  && {
    cursor: pointer;
    transition: background-color 0.3s;
    color: ${(props) => props.theme.colors.text};
    padding: 10px 20px;
    font-size: 1rem;
    display: flex;
    gap: 10px;
    justify-content: flex-start;
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }

    &.active {
      color: ${(props) => props.theme.colors.primary};
      font-weight: bold;
    }

    span {
      @media (max-width: 768px) {
        display: none;
      }
  }
`;
