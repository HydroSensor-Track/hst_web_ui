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

const HomeSelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 20%;
  align-items: center;

  @media (max-width: 768px) {
        width: 30%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.theme.sizes.buttonGap};
`;

export { StyledTopBar, HomeSelectContainer, ButtonContainer };
