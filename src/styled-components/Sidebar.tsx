import styled from "styled-components";

const SidebarContainer = styled.div`
  background-color: ${(props) => props.theme.colors.sideBarBackground};
  color: ${(props) => props.theme.colors.text};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default SidebarContainer;