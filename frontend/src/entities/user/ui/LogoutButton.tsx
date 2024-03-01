import { Button } from "@mui/material";
import { FC } from "react";
import { useLogoutMutation } from "..";

type LogoutButtonProps = {
  onClick?: () => void;
};

export const LogoutButton: FC<LogoutButtonProps> = ({ onClick }) => {
  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    onClick && onClick();
    logout("");
  };

  return (
    <Button variant="outlined" onClick={handleLogout}>
      Выход
    </Button>
  );
};
