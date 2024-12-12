import {useAuth0} from "@auth0/auth0-react";
import LogoAndTitle from "../components/LogoAndTitle.tsx";
import {LoginButton, LoginForm, LoginPage} from "../styled-components/Login.tsx";
import {useTranslation} from "react-i18next";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";


const Login = () => {
    
  const {loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
        navigate("/");
    }

  },[isAuthenticated, navigate])


  const {t} = useTranslation();
  return (
      <LoginPage>
          <LoginForm>
              <LogoAndTitle column={true} />
              <LoginButton onClick={() => loginWithRedirect()}>
                  {t("login")}
              </LoginButton>

          </LoginForm>
      </LoginPage>
  );
};

export default Login;