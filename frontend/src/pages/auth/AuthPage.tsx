import { useLocation, useNavigate } from "react-router-dom";
import Wrapper from "../../shared/ui/Wrapper";
import { LoginForm, RegisterForm } from "../../features/user/auth";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../../shared/config/consts";
import { useEffect } from "react";
import { Paper } from "@mui/material";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin =
    location.pathname === LOGIN_ROUTE ||
    location.pathname === LOGIN_ROUTE + "/";

  const setIsLogin = (openLogin: boolean) => {
    navigate(openLogin ? LOGIN_ROUTE : REGISTRATION_ROUTE);
  };

  useEffect(() => {
    document.title = "Авторизация";
  }, []);

  return (
    <Wrapper
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 480,
          p: 3,
        }}
      >
        {isLogin ? (
          <LoginForm setIsLogin={setIsLogin} />
        ) : (
          <RegisterForm setIsLogin={setIsLogin} />
        )}
      </Paper>
    </Wrapper>
  );
};

export default AuthPage;
