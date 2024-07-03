import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoginPage,
  LoginForm,
  LoginInput,
  LoginButton,
} from "../styled-components/Login.tsx";
import LogoAndTitle from "../components/LogoAndTitle.tsx";
const Login = ({
  setUserIsLoggedIn,
}: {
  setUserIsLoggedIn: (x: boolean) => void;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle login logic here
    setUserIsLoggedIn(true);
    console.log(
      `Logging in with username: ${username} and password: ${password}`
    );
    navigate("/");
  };

  return (
    <LoginPage>
      <LogoAndTitle/>
      <LoginForm onSubmit={handleSubmit}>
        <LoginInput
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <LoginInput
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton type="submit">Login</LoginButton>
      </LoginForm>
    </LoginPage>
  );
};

export default Login;
