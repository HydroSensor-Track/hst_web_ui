import styled from "styled-components";

export const StyledTitle = styled.div`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.sizes.titleFontSize};
  bold: 700;
`;
