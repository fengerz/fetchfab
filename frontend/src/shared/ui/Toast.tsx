import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { Alert, Snackbar } from "@mui/material";
import { hideToast } from "../../app/store/appSlice";

const Toast: FC = () => {
  const dispatch = useAppDispatch();
  const { show, text, variant } = useAppSelector((state) => state.app.toast);

  const handleClose = () => {
    dispatch(hideToast());
  };

  return (
    <Snackbar open={show} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={variant || "info"}
        sx={{ width: "100%" }}
        variant="filled"
      >
        {text}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
