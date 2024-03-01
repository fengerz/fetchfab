import { Box, Divider, Menu, MenuItem, Tooltip } from "@mui/material";
import { useState, MouseEvent, FC } from "react";
import { useAppSelector } from "../../../shared/hooks/redux";
import { Link } from "react-router-dom";
import { UserAvatar, useLogoutMutation } from "..";
import {
  COLLECTIONS_ROUTE,
  LIKES_ROUTE,
  MODELS_ROUTE,
} from "../../../shared/config/consts";

export const UserMenu: FC = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [logout] = useLogoutMutation();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout("");
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Профиль">
          <Box sx={{ ml: 2, cursor: "pointer" }} onClick={handleClick}>
            <UserAvatar user={currentUser} width={40} heigth={40} />
          </Box>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to={"/" + currentUser?.name}>
          <MenuItem onClick={handleClose}>
            {currentUser?.name || "Профиль"}
          </MenuItem>
        </Link>

        <Divider />

        <Link to={currentUser?.name + MODELS_ROUTE}>
          <MenuItem onClick={handleClose}>Модели</MenuItem>
        </Link>

        <Link to={currentUser?.name + COLLECTIONS_ROUTE}>
          <MenuItem onClick={handleClose}>Коллекции</MenuItem>
        </Link>

        <Link to={currentUser?.name + LIKES_ROUTE}>
          <MenuItem onClick={handleClose}>Понравившиеся</MenuItem>
        </Link>

        <Divider />

        <MenuItem onClick={handleLogout}>Выйти</MenuItem>
      </Menu>
    </>
  );
};
