import { FC } from "react";
import { Dialog, Paper } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux";
import {
  closeAuthDialog,
  openSignInDialog,
  openSignUpDialog,
} from "../../app/store/appSlice";
import { LoginForm, RegisterForm } from "../../features/user/auth";

export const AuthDialog: FC = () => {
  const dispatch = useAppDispatch();
  const { show, type } = useAppSelector((state) => state.app.authDialog);
  const isLogin = type === "signin";

  function setIsLogin(openLogin: boolean) {
    dispatch(openLogin ? openSignInDialog() : openSignUpDialog());
  }

  function handleClose() {
    dispatch(closeAuthDialog());
  }

  return (
    <Dialog onClose={handleClose} open={show}>
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
          <LoginForm setIsLogin={setIsLogin} onClose={handleClose} />
        ) : (
          <RegisterForm setIsLogin={setIsLogin} />
        )}
      </Paper>
    </Dialog>
  );
};
