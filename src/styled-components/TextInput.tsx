import styled from "styled-components";

export const StyledTextInput = styled.input`
    padding: 10px;
    background-color: transparent;
    color: ${(props) => props.theme.colors.text};
    outline: none;
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: 4px;
`;