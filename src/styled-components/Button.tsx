import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: ${(props) =>
    props.disabled
      ? props.theme.colors.buttonDisabled
      : props.theme.colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: ${(props) => props.theme.sizes.buttonFontSize};

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#0056b3")};
  }
`;
