import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const HomeText = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

export const HomeButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: none;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.primary};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryFaded};
  }
`;
