import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";

type MenuLinkProps = {
  icon?: ReactElement;
  text: string;
  link?: string;
  onClick?: () => void;
};

const MenuLink: FC<MenuLinkProps> = ({ onClick, icon, text, link }) => {
  return (
    <Link to={link ? link : "#"} onClick={onClick} style={{ width: "100%" }}>
      <MenuItem
        sx={{
          ":hover": {
            background: "none",
            color: "secondary.main",
            "& .MuiSvgIcon-root": {
              color: "secondary.main",
            },
          },
        }}
      >
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText>{text || ""}</ListItemText>
      </MenuItem>
    </Link>
  );
};

export default MenuLink;
