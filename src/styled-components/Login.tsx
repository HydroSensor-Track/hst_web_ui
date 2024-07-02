import styled from "styled-components";

const LoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 2px 0px ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.componentBackground};
`;

const LoginInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.border};
`;

const LoginButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: none;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.primary};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary_faded};
  }
`;

export { LoginPage, LoginForm, LoginInput, LoginButton };
