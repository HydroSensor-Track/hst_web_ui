import styled from "styled-components";

const LoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
  background-color: #fff;
`;

const LoginInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const LoginButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: none;
  color: #fff;
  background-color: #007bff;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export { LoginPage, LoginForm, LoginInput, LoginButton };
