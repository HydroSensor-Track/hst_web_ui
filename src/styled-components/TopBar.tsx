import styled from "styled-components";

const StyledTopBar = styled.div`
  && {
    background-color: ${(props) => props.theme.colors.componentBackground};
    color: ${(props) => props.theme.colors.text};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1vh 2vw;
  }
`;

export { StyledTopBar };
